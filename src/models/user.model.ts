import { index, modelOptions, prop } from '@typegoose/typegoose'
import * as dayjs from 'dayjs'
import { Types } from 'mongoose'

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
@index({ uid: 1 }, { unique: true })
export class UserModel {
  @prop({ required: true })
  _id: string

  @prop({ alias: 'displayName', required: true })
  display_name: string

  displayName?: string

  @prop({ alias: 'expiredAt', default: dayjs().add(1, 'day').toDate() })
  expired_at: Date

  expiredAt: Date
}
