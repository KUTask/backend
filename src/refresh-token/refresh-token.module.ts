import { TypegooseModule } from '@hirasawa_au/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { RefreshTokenModel } from 'src/models/refresh-token.model'
import { RefreshTokenService } from './refresh-token.service'

@Module({
  imports: [TypegooseModule.forFeature([RefreshTokenModel])],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
