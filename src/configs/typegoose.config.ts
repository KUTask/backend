import {
  TypegooseModuleOptions,
  TypegooseOptionsFactory,
} from '@hirasawa_au/nestjs-typegoose'
import { ConfigService } from '@nestjs/config'
import { EnviormentVariables } from '.'

export class TypegooseConfig implements TypegooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypegooseOptions(): TypegooseModuleOptions {
    return {
      uri: this.configService.get(EnviormentVariables.MONGO_URI),
    }
  }
}
