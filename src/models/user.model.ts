import { index, modelOptions, prop } from '@typegoose/typegoose'
import { Types } from 'mongoose'

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
@index({ username: 1 }, { unique: true })
@index({ uid: 1 }, { unique: true })
export class UserModel {
  @prop({ auto: true })
  _id: Types.ObjectId

  @prop()
  uid: string

  @prop({ alias: 'displayName', required: true })
  display_name: string

  displayName?: string

  @prop({ required: true, default: [] })
  sections: string[]
}
