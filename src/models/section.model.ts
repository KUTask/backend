import { index, modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { SectionTypeModel } from './section-type.model'
import { SubjectModel } from './subject.model'

class CourseDate {
  @prop()
  day: string

  @prop()
  room: string

  @prop()
  time: string
}

@modelOptions({
  schemaOptions: {
    collection: 'sections',
  },
})
@index({ section_id: 1 }, { unique: true })
export class SectionModel {
  /**
   * @description Section ID
   */
  @prop({ auto: true })
  _id: Types.ObjectId

  @prop({ alias: 'sectionId', required: true })
  section_id: string

  sectionId: string

  @prop({ ref: () => SubjectModel })
  subject: Ref<SubjectModel>

  @prop({ ref: () => SectionTypeModel, alias: 'sectionType' })
  section_type: Ref<SectionTypeModel>

  sectionType?: Ref<SectionTypeModel>

  @prop({ required: true })
  coursedate: CourseDate[]

  @prop({ required: true, alias: 'teacherNames' })
  teacher_names: string[]

  teacherNames?: string[]

  @prop({ alias: 'teacherNamesEn' })
  teacher_names_en: string[]

  teacherNamesEn?: string[]
}
