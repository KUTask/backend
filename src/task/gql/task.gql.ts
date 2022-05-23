import { Field, ObjectType } from '@nestjs/graphql'
import { SectionType } from 'src/section/gql/section-type.gql'
import { User } from 'src/user/gql/user.gql'

@ObjectType()
export class Task {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  description?: string

  @Field(() => [String])
  tags: string[]

  @Field()
  dueDate: string

  @Field(() => User, { description: 'The user who created this task' })
  user: User

  @Field(() => SectionType)
  section: SectionType
}
