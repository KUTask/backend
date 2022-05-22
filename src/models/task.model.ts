import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { BaseModel } from './base.model'
import { SectionModel } from './section.model'
import { UserModel } from './user.model'

@modelOptions({
  schemaOptions: {
    collection: 'tasks',
  },
})
export class TaskModel extends BaseModel {
  @prop({ auto: true })
  _id: Types.ObjectId

  @prop({ required: true })
  name: string

  @prop()
  description?: string

  @prop({ required: true })
  tags: string[]

  @prop({ required: true, alias: 'dueDate' })
  due_date: Date

  dueDate?: Date

  @prop({ ref: () => UserModel, required: true, type: String })
  user: Ref<UserModel, string>

  @prop({
    ref: () => SectionModel,
  })
  section: Ref<SectionModel>
}
