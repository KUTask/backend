import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SectionSubjectType {
  @Field()
  id: string

  @Field()
  subjectCode: string

  @Field()
  subjectNameTh: string

  @Field()
  subjectNameEn: string
}
