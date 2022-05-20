import { Field, ObjectType } from '@nestjs/graphql'
import { SectionCourseDate } from './coursedate.gql'
import { SectionSectionType } from './section-type.gql'
import { SectionSubjectType } from './subject.gql'

@ObjectType()
export class SectionLocalSectionType {
  @Field()
  id: string

  @Field()
  sectionId: string

  @Field(() => SectionSubjectType)
  subject: SectionSubjectType

  @Field(() => SectionSectionType)
  sectionType: SectionSectionType

  @Field(() => [SectionCourseDate])
  coursedate: SectionCourseDate[]

  @Field(() => [String])
  teacherNames?: string[]

  @Field(() => [String])
  teacherNamesEn?: string[]
}
