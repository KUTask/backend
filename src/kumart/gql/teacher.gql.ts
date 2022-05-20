import { Field, ObjectType } from '@nestjs/graphql'
import { KUTeacher } from 'kuwrapper'

@ObjectType()
export class TeacherType implements KUTeacher {
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
