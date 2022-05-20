import { ArgsType, Field } from '@nestjs/graphql'
import { IsObjectId } from 'src/utils/IsObjectId'

@ArgsType()
export class CreateTaskArgs {
  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [String])
  tags: string[]

  @Field({ description: 'Unix timestamp' })
  dueDate: string

  @Field({ description: 'The id of the section this task belongs to' })
  @IsObjectId()
  section: string
}
