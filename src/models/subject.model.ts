import { index, modelOptions, prop } from '@typegoose/typegoose'
import { Types } from 'mongoose'

@modelOptions({
  schemaOptions: {
    collection: 'subjects',
  },
})
@index({ subject_code: 1 }, { unique: true })
export class SubjectModel {
  @prop({ auto: true })
  _id: Types.ObjectId

  @prop({ required: true, alias: 'subjectCode' })
  subject_code: string

  subjectCode?: string

  @prop({ required: true, alias: 'subjectNameTh' })
  subject_name_th: string

  subjectNameTh?: string

  @prop({ required: true, alias: 'subjectNameEn' })
  subject_name_en: string

  subjectNameEn?: string
}
