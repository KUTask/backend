import { index, modelOptions, prop } from '@typegoose/typegoose'
import { Types } from 'mongoose'

@modelOptions({
  schemaOptions: {
    collection: 'section_types',
  },
})
@index({ section_type_id: 1 }, { unique: true })
export class SectionTypeModel {
  /**
   * @description Section type
   */
  @prop({ auto: true })
  _id: Types.ObjectId

  @prop({ required: true, alias: 'sectionTypeId' })
  section_type_id: string

  sectionTypeId?: string

  @prop({ required: true, alias: 'sectionTypeTh' })
  section_type_th: string

  sectionTypeTh?: string

  @prop({ required: true, alias: 'sectionTypeEn' })
  section_type_en: string

  sectionTypeEn?: string
}
