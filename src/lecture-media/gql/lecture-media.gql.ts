import { Field, ObjectType } from '@nestjs/graphql'
import { LocalSection } from 'src/section/gql/section.gql'
import { User } from 'src/user/gql/user.gql'

@ObjectType()
export class LectureMedia {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  link: string

  @Field({ description: 'Icon link' })
  icon: string

  @Field()
  description?: string

  @Field(() => LocalSection)
  section: LocalSection

  @Field(() => User)
  user: User
}
