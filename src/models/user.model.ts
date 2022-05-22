import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import * as dayjs from 'dayjs'
import { SectionModel } from './section.model'

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserModel {
  @prop({ required: true })
  _id: string

  @prop({ alias: 'displayName', required: true })
  display_name: string

  displayName?: string

  @prop({ alias: 'expiredAt', default: dayjs().add(1, 'day').toDate() })
  expired_at?: Date

  expiredAt?: Date

  @prop({ required: true })
  email: string

  @prop({ ref: () => SectionModel, default: [] })
  sections: Ref<SectionModel>[]
}
