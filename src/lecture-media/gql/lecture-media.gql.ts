import { Field, ObjectType } from '@nestjs/graphql'
import { SectionLocalSectionType } from 'src/section/gql/section.gql'
import { UserType } from 'src/user/user.model'

@ObjectType()
export class LectureMediaLectureMediaType {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  link: string

  @Field()
  icon: string

  @Field()
  description?: string

  @Field(() => SectionLocalSectionType)
  section: SectionLocalSectionType

  @Field(() => UserType)
  user: UserType
}
