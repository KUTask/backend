import { Field, ObjectType } from '@nestjs/graphql'
import { LectureMedia } from 'src/lecture-media/gql/lecture-media.gql'
import { Task } from 'src/task/gql/task.gql'
import { CourseDate } from './coursedate.gql'
import { SectionType } from './section-type.gql'
import { Subject } from './subject.gql'

@ObjectType()
export class LocalSection {
  @Field()
  id: string

  @Field()
  sectionId: string

  @Field(() => Subject)
  subject: Subject

  @Field(() => SectionType)
  sectionType: SectionType

  @Field(() => [CourseDate])
  coursedate: CourseDate[]

  @Field(() => [String])
  teacherNames?: string[]

  @Field(() => [String])
  teacherNamesEn?: string[]

  @Field(() => [Task])
  tasks: Task[]

  @Field(() => [LectureMedia])
  lectureMedias: LectureMedia[]
}
