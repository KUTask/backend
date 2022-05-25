import { Field, ObjectType } from '@nestjs/graphql'
import { LocalSection } from 'src/section/gql/section.gql'
import { User } from 'src/user/gql/user.gql'

@ObjectType()
export class Task {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field({ description: 'Unit timestamp in ms' })
  dueDate: string

  @Field(() => User, { description: 'The user who created this task' })
  user: User

  @Field(() => LocalSection)
  section: LocalSection
}
