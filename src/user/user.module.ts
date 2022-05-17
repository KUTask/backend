import { TypegooseModule } from '@hirasawa_au/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { UserModel } from 'src/models/user.model'
import { UserService } from './user.service'

@Module({
  imports: [TypegooseModule.forFeature([UserModel])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
