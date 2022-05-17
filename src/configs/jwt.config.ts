import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'
import { EnviormentVariables } from '.'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      privateKey: this.configService.get<string>(
        EnviormentVariables.JWT_PRIVATE_KEY,
      ),
      publicKey: this.configService.get<string>(
        EnviormentVariables.JWT_PUBLIC_KEY,
      ),
      signOptions: {
        algorithm: 'ES256',
      },
    }
  }
}
