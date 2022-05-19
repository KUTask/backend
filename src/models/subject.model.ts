import { prop } from '@typegoose/typegoose'

export class SubjectModel {
  @prop({ required: true })
  _id: string

  @prop({ required: true, alias: 'subjectNameTh' })
  subject_name_th: string

  subjectNameTh?: string

  @prop({ required: true, alias: 'subjectNameEn' })
  subject_name_en: string

  subjectNameEn?: string
}
