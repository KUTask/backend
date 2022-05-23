import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Schedule {
  @Field()
  day: string

  @Field(() => Int)
  timeFrom: number

  @Field(() => Int)
  timeTo: number

  @Field()
  time: string

  @Field()
  room: string
}
