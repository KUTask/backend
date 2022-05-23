import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CourseDate {
  @Field()
  day: string

  @Field()
  room: string

  @Field()
  time: string
}
