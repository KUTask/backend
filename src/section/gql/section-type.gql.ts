import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SectionType {
  @Field()
  id: string

  @Field({ description: 'Section Type name in English' })
  sectionTypeEn: string

  @Field({ description: 'Section Type name in Thai' })
  sectionTypeTh: string
}
