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

  @prop({ alias: 'displayName', required: true })
  display_name: string

  displayName?: string

  @prop({ required: true, default: [] })
  sections: string[]

  @prop({ alias: 'profilePictureUrl', required: true })
  pfp_url: string

  profilePictureUrl?: string

  @prop({ required: true })
  email: string
}
