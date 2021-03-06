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

  @Field({ description: 'Unix timestamp', nullable: true })
  dueDate?: string

  @Field({ description: 'Local Section ID', nullable: true })
  section?: string
}
