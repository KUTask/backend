import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Schedule } from 'kuwrapper'

@ObjectType()
export class ScheduleType implements Schedule {
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
