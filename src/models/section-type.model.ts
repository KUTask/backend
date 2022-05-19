import { prop } from '@typegoose/typegoose'

export class SectionTypeModel {
  /**
   * @description Section type
   */
  @prop({ required: true })
  _id: string

  @prop({ required: true, alias: 'sectionTypeTh' })
  section_type_th: string

  sectionTypeTh?: string

  @prop({ required: true, alias: 'sectionTypeEn' })
  section_type_en: string

  sectionTypeEn?: string
}
