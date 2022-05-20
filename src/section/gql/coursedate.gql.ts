import { Field, ObjectType } from '@nestjs/graphql'
import { CourseDate } from 'src/models/section.model'

@ObjectType()
export class SectionCourseDate implements CourseDate {
  @Field()
  day: string

  @Field()
  room: string

  @Field()
  time: string
}
