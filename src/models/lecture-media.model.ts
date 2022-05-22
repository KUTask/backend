import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { BaseModel } from './base.model'
import { SectionModel } from './section.model'
import { UserModel } from './user.model'

@modelOptions({
  schemaOptions: {
    collection: 'lecture_medias',
  },
})
export class LectureMediaModel extends BaseModel {
  @prop({ auto: true })
  _id: Types.ObjectId

  @prop({ required: true })
  name: string

  @prop({ required: true })
  link: string

  @prop({ required: true })
  icon: string

  @prop()
  description?: string

  @prop({
    localField: 'section',
    foreignField: '_id',
    justOne: true,
    ref: () => SectionModel,
  })
  section: Ref<SectionModel>

  @prop({ required: true, ref: () => UserModel })
  user: Ref<UserModel>
}
