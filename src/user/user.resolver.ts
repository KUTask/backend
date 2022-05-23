import { Directive, Mutation, Resolver, Query, Args } from '@nestjs/graphql'
import { DecodedIdToken } from 'firebase-admin/auth'
import mercurius from 'mercurius'
import { User } from './user.decorator'
import { User as UserModel } from './gql/user.gql'
import { UserService } from './user.service'

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel], { name: 'users' })
  @Directive('@auth')
  users() {
    return this.userService.find()
  }

  @Query(() => UserModel, {
    name: 'user',
    description:
      'Get the current user [not pass id] or Get the user by id [pass id]',
  })
  @Directive('@auth')
  user(
    @User() user: Pick<DecodedIdToken, 'uid'>,
    @Args({ type: () => String, name: 'id', nullable: true }) id?: string,
  ) {
    id = id ?? user.uid
    return this.userService.findById(id)
  }

  @Mutation(() => UserModel, { name: 'createUser' })
  @Directive('@auth')
  async createUser(
    @User()
    user: Pick<DecodedIdToken, 'uid' | 'name' | 'email_verified' | 'email'>,
    @Args({ type: () => String, nullable: true, name: 'displayName' })
    displayName?: string,
  ) {
    displayName = displayName ?? user.name
    const hasUser = await this.userService.hasUser(user.uid)

    if (hasUser) {
      return this.userService.findById(user.uid)
    }

    return this.userService.create(
      user.uid,
      displayName,
      user.email,
      user.email_verified,
    )
  }

  @Mutation(() => UserModel, { name: 'updateDisplayName' })
  @Directive('@auth')
  async updateDisplayName(
    @User() user: Pick<DecodedIdToken, 'uid'>,
    @Args({ type: () => String, name: 'displayName' }) displayName: string,
  ) {
    return this.userService.updateDisplayName(user.uid, displayName)
  }

  @Mutation(() => UserModel, {
    name: 'verifyEmail',
    description: 'Check verify from id token',
  })
  @Directive('@auth')
  async verifyEmail(
    @User() user: Pick<DecodedIdToken, 'uid' | 'email_verified'>,
  ) {
    if (!user.email_verified) {
      return Promise.reject(
        new mercurius.ErrorWithProps(
          'Email is not verified',
          {
            code: 'EMAIL_NOT_VERIFIED',
          },
          400,
        ),
      )
    }

    return this.userService.updateVerifiedEmail(user.uid)
  }
}
