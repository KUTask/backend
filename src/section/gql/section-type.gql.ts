import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SectionSectionType {
  @Field()
  id: string
}
