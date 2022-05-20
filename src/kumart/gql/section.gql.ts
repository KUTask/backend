import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ScheduleType } from './schedule.gql'
import { TeacherType } from './teacher.gql'

@ObjectType()
export class SectionType {
  @Field(() => [ScheduleType])
  schedules: ScheduleType[]

  @Field(() => [TeacherType])
  teacher: TeacherType[]

  @Field(() => Int)
  enrollId: number

  @Field(() => Int)
  sectionId: number

  @Field()
  subjectCode: string

  @Field()
  subjectShow: string

  @Field()
  subjectNameTh: string

  @Field()
  subjectNameEn: string

  @Field(() => Int)
  credit: number

  @Field()
  creditShow: string

  @Field()
  sectionCode: string

  @Field()
  sectionType: string

  @Field()
  sectionTypeTh: string

  @Field()
  sectionTypeEn: string

  @Field()
  enrollStatus: string

  @Field()
  approveStatus: string

  @Field()
  enrollType: string

  @Field()
  enrollTypeTh: string

  @Field()
  enrollTypeEn: string

  @Field()
  subjectType: string

  isPreRegister?: any

  @Field()
  campusCode: string

  @Field()
  campusNameTh: string

  @Field()
  campusNameEn: string

  @Field()
  inchangeprocess: string
}
