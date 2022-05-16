import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { UserModel } from './user.model'

@modelOptions({
  schemaOptions: {
    collection: 'refresh-tokens',
  },
})
export class RefreshTokenModel {
  @prop({ auto: true })
  _id: Types.ObjectId

  @prop({ required: true, ref: () => UserModel })
  user: Ref<UserModel>

  @prop({ required: true, type: Date, alias: 'expiredAt' })
  expired_at: Date

  expiredAt?: Date
}
