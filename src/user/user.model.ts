import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserType {
  @Field()
  id: string

  @Field()
  displayName: string
}
