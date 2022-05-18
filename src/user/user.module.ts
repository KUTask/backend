import { TypegooseModule } from '@hirasawa_au/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { UserModel } from 'src/models/user.model'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

@Module({
  imports: [TypegooseModule.forFeature([UserModel])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
