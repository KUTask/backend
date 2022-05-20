import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { DocumentType } from '@typegoose/typegoose'
import { DecodedIdToken } from 'firebase-admin/auth'
import { Types } from 'mongoose'
import { SectionTypeModel } from 'src/models/section-type.model'
import { SectionModel } from 'src/models/section.model'
import { SubjectModel } from 'src/models/subject.model'
import { User } from 'src/user/user.decorator'
import { SectionSectionType } from './gql/section-type.gql'
import { SectionLocalSectionType } from './gql/section.gql'
import { SectionSubjectType } from './gql/subject.gql'
import { SectionService } from './section.service'

@Resolver(() => SectionLocalSectionType)
export class SectionResolver {
  constructor(private readonly sectionService: SectionService) {}

  @Query(() => [SectionLocalSectionType], { name: 'sectionSections' })
  async sections(@User() user: Pick<DecodedIdToken, 'uid'>) {
    return this.sectionService.findRegisteredCourses(user.uid)
  }

  @Mutation(() => [SectionLocalSectionType], {
    name: 'sectionRegister',
    description: 'Register Sections in Local Database (Not in my.ku.th)',
  })
  async register(
    @User() user: Pick<DecodedIdToken, 'uid'>,
    @Args({ type: () => [String], name: 'sectionIds' }) sectionIds: string[],
  ) {
    return this.sectionService.registerSections(
      user.uid,
      sectionIds.map((id) => new Types.ObjectId(id)),
    )
  }

  @ResolveField(() => SectionSubjectType, { name: 'subject' })
  async subject(
    @Parent() section: Pick<DocumentType<SectionModel>, 'populate'>,
  ) {
    const populatedSection = await section.populate('subject')
    return <DocumentType<SubjectModel>>populatedSection.subject
  }

  @ResolveField(() => SectionSectionType, { name: 'sectionType' })
  async sectionType(
    @Parent() section: Pick<DocumentType<SectionModel>, 'populate'>,
  ) {
    const populatedSection = await section.populate('section_type')
    return <DocumentType<SectionTypeModel>>populatedSection.sectionType
  }
}
