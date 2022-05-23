import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Subject {
  @Field()
  id: string

  @Field()
  subjectCode: string

  @Field()
  subjectNameTh: string

  @Field()
  subjectNameEn: string
}
