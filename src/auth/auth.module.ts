import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JwtConfigService } from 'src/configs/jwt.config'
import { UserModule } from 'src/user/user.module'
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module'

@Module({
  imports: [
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    UserModule,
    RefreshTokenModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
