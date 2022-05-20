import { Field, ObjectType } from '@nestjs/graphql'
import { SectionSectionType } from 'src/section/gql/section-type.gql'
import { UserType } from 'src/user/user.model'

@ObjectType()
export class TaskTaskType {
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

  @Field(() => UserType, { description: 'The user who created this task' })
  user: UserType

  @Field(() => SectionSectionType)
  section: SectionSectionType
}
