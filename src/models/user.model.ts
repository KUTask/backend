import { index, modelOptions, prop } from '@typegoose/typegoose'
import { toBuffer, toString } from 'uuid-buffer'

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
@index({ username: 1 }, { unique: true })
export class UserModel {
  @prop({
    type: Buffer,
    subtype: 4,
    get: (_) => (_ ? toString(_) : _),
    set: toBuffer,
    required: true,
  })
  _id: string

  @prop({ alias: 'firstName', required: true })
  first_name: string

  firstName?: string

  @prop({ alias: 'lastName', required: true })
  last_name: string

  lastName?: string

  @prop({ required: true })
  username: string

  @prop({ required: true })
  email: string
}
