import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class KUTeacher {
  @Field()
  title: string

  @Field()
  titleEn: string

  @Field()
  positionTh: string

  @Field()
  positionEn: string

  @Field()
  nameTh: string

  @Field()
  nameEn: string
}
