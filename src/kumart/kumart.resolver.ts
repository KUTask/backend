import {
  Args,
  Directive,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { DocumentType } from '@typegoose/typegoose'
import { SectionTypeModel } from 'src/models/section-type.model'
import { SectionModel } from 'src/models/section.model'
import { SubjectModel } from 'src/models/subject.model'
import { CourseDate } from 'src/section/gql/coursedate.gql'
import { SectionType } from 'src/section/gql/section-type.gql'
import { Subject } from 'src/section/gql/subject.gql'
import { KuAuthArgs } from './args/ku-auth.args'
import { KuSection } from './gql/ku-section.gql'
import { KumartService } from './kumart.service'

@Resolver(() => KuSection)
export class KumartResolver {
  constructor(private readonly kumartService: KumartService) {}

  @Query(() => [KuSection], { name: 'kumartSections' })
  @Directive('@auth')
  async sections(@Args() { username, password }: KuAuthArgs) {
    const kumartSections = await this.kumartService.getRegisteredCourses(
      username,
      password,
    )

    const sections = await this.kumartService.saveToDb(kumartSections)

    return sections
  }

  @ResolveField(() => SectionType)
  async sectionType(
    @Parent() section: Pick<DocumentType<SectionModel>, 'populate'>,
  ) {
    const populatedSection = await section.populate('section_type')
    return <DocumentType<SectionTypeModel>>populatedSection.section_type
  }

  @ResolveField(() => Subject)
  async subject(
    @Parent() section: Pick<DocumentType<SectionModel>, 'populate'>,
  ) {
    const populatedSection = await section.populate('subject')
    return <DocumentType<SubjectModel>>populatedSection.subject
  }
}
