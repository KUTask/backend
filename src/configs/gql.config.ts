import { Injectable } from '@nestjs/common'
import {
  MercuriusDriverConfig,
  MercuriusDriverConfigFactory,
} from '@nestjs/mercurius'
import { join } from 'path'

@Injectable()
export class GqlConfigService implements MercuriusDriverConfigFactory {
  createGqlOptions():
    | Omit<MercuriusDriverConfig, 'driver'>
    | Promise<Omit<MercuriusDriverConfig, 'driver'>> {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }
  }
}
