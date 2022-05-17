import {
  TypegooseModuleOptions,
  TypegooseOptionsFactory,
} from '@hirasawa_au/nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnviormentVariables } from '.'

@Injectable()
export class TypegooseConfig implements TypegooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypegooseOptions(): TypegooseModuleOptions {
    return {
      uri: this.configService.get(EnviormentVariables.MONGO_URI),
    }
  }
}
