import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Schedule } from './schedule.gql'
import { KUTeacher } from './teacher.gql'

@ObjectType()
export class KUSectionType {
  @Field(() => [Schedule])
  schedules: Schedule[]

  @Field(() => [KUTeacher])
  teacher: KUTeacher[]

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
