import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { SectionTypeModel } from './section-type.model'
import { SubjectModel } from './subject.model'

@modelOptions({
  schemaOptions: {
    collection: 'sections',
  },
})
export class SectionModel {
  /**
   * @description Section ID
   */
  @prop({ required: true })
  _id: number

  @prop({ ref: () => SubjectModel })
  subject: Ref<SubjectModel>

  @prop({ required: true, alias: 'maxCredit' })
  max_credit: number

  maxCredit?: number

  @prop({ ref: () => SectionTypeModel, alias: 'sectionType' })
  section_type: Ref<SectionTypeModel>

  sectionType?: Ref<SectionTypeModel>

  @prop({ required: true })
  coursedate: string

  @prop({ required: true, alias: 'teacherName' })
  teacher_name: string

  teacherName?: string

  @prop({ required: true, alias: 'teacherNameEn' })
  teacher_name_en: string

  teacherNameEn?: string

  @prop({ required: true, alias: 'roomNameTh' })
  room_name_th: string

  roomNameTh?: string
}
