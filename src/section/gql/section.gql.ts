import { Field, ObjectType } from '@nestjs/graphql'
import { LectureMediaLectureMediaType } from 'src/lecture-media/gql/lecture-media.gql'
import { TaskTaskType } from 'src/task/gql/task.gql'
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

  @Field(() => [TaskTaskType])
  tasks: TaskTaskType[]

  @Field(() => [LectureMediaLectureMediaType])
  lectureMedias: LectureMediaLectureMediaType[]
}
