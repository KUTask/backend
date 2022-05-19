import { Directive, Mutation, Resolver, Query, Args } from '@nestjs/graphql'
import { DecodedIdToken } from 'firebase-admin/auth'
import { User } from './user.decorator'
import { UserType } from './user.model'
import { UserService } from './user.service'

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType, { name: 'users' })
  @Directive('@auth')
  users() {
    return this.userService.find()
  }

  @Mutation(() => UserType, { name: 'userCreateUser' })
  @Directive('@auth')
  async createUser(
    @User() user: Pick<DecodedIdToken, 'uid' | 'name'>,
    @Args({ type: () => String, nullable: true }) displayName?: string,
  ) {
    displayName = displayName ?? user.name
    const hasUser = await this.userService.hasUser(user.uid)

    if (hasUser) {
      return this.userService.findById(user.uid)
    }

    return this.userService.create(user.uid, displayName)
  }

  @Mutation(() => UserType, { name: 'userUpdateDisplayName' })
  @Directive('@auth')
  async updateDisplayName(
    @User() user: Pick<DecodedIdToken, 'uid'>,
    @Args({ type: () => String, name: 'displayName' }) displayName: string,
  ) {
    return this.userService.updateDisplayName(user.uid, displayName)
  }
}
