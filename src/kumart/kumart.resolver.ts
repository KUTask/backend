import { Args, Directive, Query, Resolver } from '@nestjs/graphql'
import { KuAuthArgs } from './args/ku-auth.args'
import { SectionType } from './gql/section.gql'
import { KumartService } from './kumart.service'

@Resolver()
export class KumartResolver {
  constructor(private readonly kumartService: KumartService) {}

  @Query(() => [SectionType], { name: 'sections' })
  @Directive('@auth')
  sections(@Args() { username, password }: KuAuthArgs): Promise<SectionType[]> {
    return this.kumartService.getRegisteredCourses(username, password)
  }
}
