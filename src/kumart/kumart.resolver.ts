import { Args, Directive, Query, Resolver } from '@nestjs/graphql'
import { LocalSection } from 'src/section/gql/section.gql'
import { KuAuthArgs } from './args/ku-auth.args'
import { KumartService } from './kumart.service'

@Resolver(() => LocalSection)
export class KumartResolver {
  constructor(private readonly kumartService: KumartService) {}

  @Query(() => [LocalSection], { name: 'kumartSections' })
  @Directive('@auth')
  async sections(@Args() { username, password }: KuAuthArgs) {
    const kumartSections = await this.kumartService.getRegisteredCourses(
      username,
      password,
    )

    const sections = await this.kumartService.saveToDb(kumartSections)

    return sections
  }
}
