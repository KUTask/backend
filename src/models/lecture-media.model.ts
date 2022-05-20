import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { SectionModel } from './section.model'

@modelOptions({
  schemaOptions: {
    collection: 'lecture_medias',
  },
})
export class LectureMediaModel {
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
}
