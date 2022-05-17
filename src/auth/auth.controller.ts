import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './dto/login.request.dto'
import { FastifyRequest, FastifyReply } from 'fastify'
import { LoginResponseDto } from './dto/login.response.dto'
import { Types } from 'mongoose'
import { RefreshResponseDto } from './dto/refresh.response.dto'

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Post('/login')
  @ApiOkResponse({ type: LoginResponseDto })
  async getAccessToken(
    @Body() dto: LoginRequestDto,
    @Res({ passthrough: true }) res: Pick<FastifyReply, 'setCookie'>,
  ) {
    const user = await this.userService.upsert(dto)
    const accessToken = await this.authService.sign({
      id: user._id.toHexString(),
      displayName: user.displayName,
      profilePictureUrl: user.profilePictureUrl,
      email: user.email,
    })

    const refreshToken = await this.refreshTokenService.create(
      user._id,
      dto.permanentLogin,
    )

    this.authService.setTokenInCookie(res, accessToken, refreshToken)

    return {
      accessToken,
      refreshToken,
    }
  }

  @Post('/logout')
  @ApiNoContentResponse()
  async logout(
    @Req() req: Pick<FastifyRequest, 'cookies'>,
    @Res()
    res: Pick<FastifyReply, 'clearCookie' | 'status'>,
  ) {
    await this.refreshTokenService.revoke(
      new Types.ObjectId(req.cookies.refresh_token),
    )

    this.authService.clearAccessToken(res)
    this.authService.clearRefreshToken(res)
    res.status(HttpStatus.NO_CONTENT).send()
  }

  @Post('/refresh')
  @ApiOkResponse({ type: RefreshResponseDto })
  async refresh(
    @Req() req: Pick<FastifyRequest, 'cookies'>,
    @Res({ passthrough: true }) res: Pick<FastifyReply, 'setCookie'>,
  ) {
    const newRefreshToken = await this.refreshTokenService.refresh(
      new Types.ObjectId(req.cookies.refresh_token),
    )

    if (!newRefreshToken) {
      throw new UnauthorizedException('Token expired')
    }

    const user = await this.refreshTokenService.findUserByToken(
      new Types.ObjectId(newRefreshToken),
    )

    const accessToken = await this.authService.sign({
      id: user.id,
      displayName: user.displayName,
      profilePictureUrl: user.profilePictureUrl,
      email: user.email,
    })

    this.authService.setTokenInCookie(res, accessToken, newRefreshToken)

    return { accessToken, refreshToken: newRefreshToken }
  }
}
