import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserType {
  @Field()
  id: string

  @Field()
  uid: string

  @Field()
  displayName: string
}
