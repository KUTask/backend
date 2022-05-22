import { index, modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { LectureMediaModel } from './lecture-media.model'
import { SectionTypeModel } from './section-type.model'
import { SubjectModel } from './subject.model'
import { TaskModel } from './task.model'

export class CourseDate {
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

  @prop({ ref: () => SectionTypeModel, required: true })
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

  @prop({
    ref: () => TaskModel,
    localField: 'tasks',
    foreignField: '_id',
    justOne: false,
  })
  tasks: Ref<TaskModel>[]

  @prop({
    ref: () => LectureMediaModel,
    alias: 'lectureMedias',
    localField: 'lecture_medias',
    foreignField: '_id',
    justOne: false,
  })
  lecture_medias: Ref<LectureMediaModel>[]

  lectureMedias?: Ref<LectureMediaModel>[]
}
