import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class CreateLectureMediaArgs {
  @Field()
  name: string

  @Field()
  link: string

  @Field()
  icon: string

  @Field()
  description?: string

  @Field({ description: 'section object id' })
  section: string
}
