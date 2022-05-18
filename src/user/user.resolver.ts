import { Directive, Mutation, Resolver, Query } from '@nestjs/graphql'
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

  @Mutation(() => UserType, { name: 'createUser' })
  @Directive('@auth')
  async createUser(@User() user: Pick<DecodedIdToken, 'uid' | 'name'>) {
    const hasUser = await this.userService.hasUser(user.uid)

    if (hasUser) {
      return this.userService.findByUid(user.uid)
    }

    return this.userService.create(user.uid, user.name)
  }
}
