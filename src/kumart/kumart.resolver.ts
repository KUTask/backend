import {
  Args,
  Directive,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { KuAuthArgs } from './args/ku-auth.args'
import { Schedule } from './gql/schedule.gql'
import { KUSectionType } from './gql/section.gql'
import { KUTeacher } from './gql/teacher.gql'
import { KumartService } from './kumart.service'

@Resolver(() => KUSectionType)
export class KumartResolver {
  constructor(private readonly kumartService: KumartService) {}

  @Query(() => [KUSectionType], { name: 'kumartSections' })
  @Directive('@auth')
  async sections(
    @Args() { username, password }: KuAuthArgs,
  ): Promise<KUSectionType[]> {
    const sections = await this.kumartService.getRegisteredCourses(
      username,
      password,
    )

    await this.kumartService.saveToDb(sections)

    return sections
  }

  @ResolveField()
  teacher(@Parent() section: Pick<KUSectionType, 'teacher'>): KUTeacher[] {
    return section.teacher
  }

  @ResolveField()
  schedules(@Parent() section: Pick<KUSectionType, 'schedules'>): Schedule[] {
    return section.schedules
  }
}
