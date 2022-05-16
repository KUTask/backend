import { index, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
@index({ username: 1 }, { unique: true })
export class UserModel {
  @prop()
  id: string

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
