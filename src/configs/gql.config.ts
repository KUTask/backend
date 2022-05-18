import { Injectable } from '@nestjs/common'
import {
  MercuriusDriverConfig,
  MercuriusDriverConfigFactory,
} from '@nestjs/mercurius'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import { join } from 'path'
import { authDirectiveTransformer } from 'src/auth/auth.directive'

@Injectable()
export class GqlConfigService implements MercuriusDriverConfigFactory {
  createGqlOptions():
    | Omit<MercuriusDriverConfig, 'driver'>
    | Promise<Omit<MercuriusDriverConfig, 'driver'>> {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ raw }) => {
        return {
          user: raw.user,
        }
      },

      transformSchema: (schema) => authDirectiveTransformer(schema, 'auth'),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'auth',
            locations: [
              DirectiveLocation.FIELD,
              DirectiveLocation.FIELD_DEFINITION,
            ],
          }),
        ],
      },
    }
  }
}
