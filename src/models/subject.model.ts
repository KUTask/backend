import { prop } from '@typegoose/typegoose'

export class SubjectModel {
  @prop({ required: true })
  _id: string

  @prop({ required: true })
  subjectNameTh: string

  @prop({ required: true })
  subjectNameEn: string
}
