import { Field, ObjectType } from '@nestjs/graphql'
import { LectureMedia } from 'src/lecture-media/gql/lecture-media.gql'
import { CourseDate } from 'src/section/gql/coursedate.gql'
import { SectionType } from 'src/section/gql/section-type.gql'
import { LocalSection } from 'src/section/gql/section.gql'
import { Subject } from 'src/section/gql/subject.gql'
import { Task } from 'src/task/gql/task.gql'

@ObjectType()
export class KuSection implements LocalSection {
  @Field(() => String)
  id: string

  @Field(() => String)
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
