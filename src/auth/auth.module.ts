import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JwtConfigService } from 'src/configs/jwt.config'
import { UserService } from 'src/user/user.service'

@Module({
  imports: [
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    UserService,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
