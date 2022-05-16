import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { User } from './user.class'
import { UserPayload } from './user.payload'
import { FastifyReply } from 'fastify'
import * as dayjs from 'dayjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  sign(payload: UserPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: '5m',
    })
  }

  async verify(token: string): Promise<User> {
    const payload: UserPayload = await this.jwtService.verifyAsync(token)
    const user = new User()

    user.id = payload.id
    user.displayName = payload.displayName
    user.profilePictureUrl = payload.profilePictureUrl
    user.email = payload.email

    return user
  }

  setTokenInCookie(
    res: Pick<FastifyReply, 'setCookie'>,
    accessToken: string,
    refreshToken: string,
  ) {
    res.setCookie('access_token', accessToken, {
      expires: dayjs().add(5, 'minute').toDate(),
    })
    res.setCookie('refresh_token', refreshToken, {
      expires: dayjs().add(14, 'day').toDate(),
    })
  }

  clearAccessToken(res: Pick<FastifyReply, 'clearCookie'>) {
    res.clearCookie('access_token')
  }

  clearRefreshToken(res: Pick<FastifyReply, 'clearCookie'>) {
    res.clearCookie('refresh_token')
  }
}
