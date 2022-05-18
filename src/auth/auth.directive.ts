import {
  mapSchema,
  FieldMapper,
  getDirective,
  MapperKind,
} from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import mercurius from 'mercurius'

const authMapper: (
  schema: GraphQLSchema,
  directiveName: string,
) => FieldMapper = (schema, directiveName) => (fieldConfig) => {
  const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

  if (authDirective) {
    const { resolve = defaultFieldResolver } = fieldConfig

    fieldConfig.resolve = async function (...args) {
      const [, , context] = args
      const { user } = context
      if (!user) {
        throw new mercurius.ErrorWithProps(
          'You do not have permission.',
          { code: 'PERMISSION_DENIED' },
          403,
        )
      }
      return resolve(...args)
    }

    return fieldConfig
  }
}

export function authDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: authMapper(schema, directiveName),
    [MapperKind.FIELD]: authMapper(schema, directiveName),
  })
}
