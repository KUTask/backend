import { Query, Resolver } from '@nestjs/graphql'
import {} from 'graphql'

@Resolver()
export class HealthResolver {
  @Query(() => String)
  health() {
    return 'ok'
  }
}
