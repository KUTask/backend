import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class UpdateLectureMediaArgs {
  @Field()
  id: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  link?: string

  @Field({ nullable: true })
  icon?: string

  @Field({ nullable: true })
  description?: string
}
