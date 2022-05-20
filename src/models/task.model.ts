import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { SectionModel } from './section.model'

@modelOptions({
  schemaOptions: {
    collection: 'tasks',
  },
})
export class TaskModel {
  @prop({ auto: true })
  _id: Types.ObjectId

  @prop({ required: true })
  name: string

  @prop({ required: true })
  description: string

  @prop({ required: true })
  tags: string[]

  @prop({ required: true, alias: 'dueDate' })
  due_date: Date

  dueDate?: Date

  @prop({
    localField: 'section',
    foreignField: '_id',
    justOne: true,
    ref: () => SectionModel,
  })
  section: Ref<SectionModel>
}
