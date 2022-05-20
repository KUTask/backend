import {
  Args,
  Directive,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { KuAuthArgs } from './args/ku-auth.args'
import { ScheduleType } from './gql/schedule.gql'
import { SectionType } from './gql/section.gql'
import { TeacherType } from './gql/teacher.gql'
import { KumartService } from './kumart.service'

@Resolver(() => SectionType)
export class KumartResolver {
  constructor(private readonly kumartService: KumartService) {}

  @Query(() => [SectionType], { name: 'kumartSections' })
  @Directive('@auth')
  sections(@Args() { username, password }: KuAuthArgs): Promise<SectionType[]> {
    return this.kumartService.getRegisteredCourses(username, password)
  }

  @ResolveField()
  teacher(@Parent() section: Pick<SectionType, 'teacher'>): TeacherType[] {
    return section.teacher
  }

  @ResolveField()
  schedules(@Parent() section: Pick<SectionType, 'schedules'>): ScheduleType[] {
    return section.schedules
  }
}
