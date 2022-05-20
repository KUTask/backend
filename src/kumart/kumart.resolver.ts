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
  async sections(
    @Args() { username, password }: KuAuthArgs,
  ): Promise<SectionType[]> {
    const sections = await this.kumartService.getRegisteredCourses(
      username,
      password,
    )

    await this.kumartService.saveToDb(sections)

    return sections
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
