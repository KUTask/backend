import { ArgsType, Field } from '@nestjs/graphql'
import { IsObjectId } from 'src/utils/IsObjectId'

@ArgsType()
export class UpdateTaskArgs {
  @Field()
  @IsObjectId()
  id: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field({ description: 'Unix timestamp', nullable: true })
  dueDate?: string
}
