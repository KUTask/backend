import { Test, TestingModule } from '@nestjs/testing'
import { Types } from 'mongoose'
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service'
import { UserService } from 'src/user/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './dto/login.request.dto'

jest.mock('src/user/user.service')
jest.mock('./auth.service')
jest.mock('src/refresh-token/refresh-token.service')

describe('AuthController', () => {
  let controller: AuthController
  let authService: AuthService
  let userService: UserService
  let refreshTokenService: RefreshTokenService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, RefreshTokenService],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
    userService = module.get<UserService>(UserService)
    refreshTokenService = module.get<RefreshTokenService>(RefreshTokenService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getAccessToken', () => {
    it('should call upsert with dto value', async () => {
      const dto = new LoginRequestDto()
      dto.uid = '628247b4d47554325bb8514e'
      dto.email = 'email'
      dto.displayName = 'displayName'
      dto.profilePictureUrl = 'profilePictureUrl'
      dto.permanentLogin = false

      const res = {
        setCookie: jest.fn().mockReturnThis(),
      }

      userService.upsert = jest
        .fn()
        .mockResolvedValue({ _id: new Types.ObjectId(), dto })
      authService.sign = jest.fn().mockResolvedValue('token')
      refreshTokenService.create = jest.fn().mockResolvedValue('refreshToken')
      authService.setTokenInCookie = jest.fn()

      await controller.getAccessToken(dto, res)

      expect(userService.upsert).toBeCalledWith(dto)
    })

    it('should call sign with correct payload', async () => {
      const dto = new LoginRequestDto()
      dto.uid = '628247b4d47554325bb8514e'
      dto.email = 'email'
      dto.displayName = 'displayName'
      dto.profilePictureUrl = 'profilePictureUrl'
      dto.permanentLogin = false

      const userId = new Types.ObjectId('628263ff72e3f7192ca1b2e6')

      const res = {
        setCookie: jest.fn().mockReturnThis(),
      }

      userService.upsert = jest.fn().mockResolvedValue({
        _id: userId,
        ...dto,
      })
      authService.sign = jest.fn().mockResolvedValue('token')
      refreshTokenService.create = jest.fn().mockResolvedValue('refreshToken')
      authService.setTokenInCookie = jest.fn()

      await controller.getAccessToken(dto, res)

      expect(authService.sign).toBeCalledWith({
        displayName: dto.displayName,
        email: dto.email,
        id: userId.toHexString(),
        profilePictureUrl: dto.profilePictureUrl,
      })
    })

    it('should create refresh token with correctly user', async () => {
      const dto = new LoginRequestDto()
      dto.uid = '628247b4d47554325bb8514e'
      dto.email = 'email'
      dto.displayName = 'displayName'
      dto.profilePictureUrl = 'profilePictureUrl'
      dto.permanentLogin = false

      const userId = new Types.ObjectId('628263ff72e3f7192ca1b2e6')

      const res = {
        setCookie: jest.fn().mockReturnThis(),
      }

      userService.upsert = jest.fn().mockResolvedValue({
        _id: userId,
        ...dto,
      })
      authService.sign = jest.fn().mockResolvedValue('token')
      refreshTokenService.create = jest.fn().mockResolvedValue('refreshToken')
      authService.setTokenInCookie = jest.fn()

      await controller.getAccessToken(dto, res)

      expect(refreshTokenService.create).toBeCalledWith(
        userId,
        dto.permanentLogin,
      )
    })

    it('should set in cookie', async () => {
      const dto = new LoginRequestDto()
      dto.uid = '628247b4d47554325bb8514e'
      dto.email = 'email'
      dto.displayName = 'displayName'
      dto.profilePictureUrl = 'profilePictureUrl'
      dto.permanentLogin = false

      const res = {
        setCookie: jest.fn().mockReturnThis(),
      }
      userService.upsert = jest.fn().mockResolvedValue({
        _id: new Types.ObjectId(),
        ...dto,
      })
      authService.sign = jest.fn().mockResolvedValue('token')
      refreshTokenService.create = jest.fn().mockResolvedValue('refreshToken')
      authService.setTokenInCookie = jest.fn()

      await controller.getAccessToken(dto, res)

      expect(authService.setTokenInCookie).toBeCalledWith(
        res,
        'token',
        'refreshToken',
      )
    })
  })

  describe('logout', () => {
    it('should clearAccessToken be called', async () => {
      const req = {
        cookies: {
          access_token: 'token',
          refresh_token: '72656672657368546f6b656e',
        },
      }

      const res = {
        clearCookie: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      }

      authService.clearAccessToken = jest.fn()
      refreshTokenService.revoke = jest.fn()
      authService.clearRefreshToken = jest.fn()

      await controller.logout(req, res)
      expect(authService.clearAccessToken).toBeCalledWith(res)
    })

    it('should revoke refresh token', async () => {
      const req = {
        cookies: {
          access_token: 'token',
          refresh_token: '72656672657368546f6b656e',
        },
      }

      const res = {
        clearCookie: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      }

      authService.clearAccessToken = jest.fn()
      refreshTokenService.revoke = jest.fn()
      authService.clearRefreshToken = jest.fn()

      await controller.logout(req, res)
      expect(refreshTokenService.revoke).toBeCalledWith(
        new Types.ObjectId(req.cookies.refresh_token),
      )
    })

    it('should clear refresh token', async () => {
      const req = {
        cookies: {
          access_token: 'token',
          refresh_token: '72656672657368546f6b656e',
        },
      }

      const res = {
        clearCookie: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      }

      authService.clearAccessToken = jest.fn()
      refreshTokenService.revoke = jest.fn()
      authService.clearRefreshToken = jest.fn()

      await controller.logout(req, res)
      expect(authService.clearRefreshToken).toBeCalledWith(res)
    })

    it('should return 204', async () => {
      const req = {
        cookies: {
          access_token: 'token',
          refresh_token: '72656672657368546f6b656e',
        },
      }

      const res = {
        clearCookie: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      }

      authService.clearAccessToken = jest.fn()
      refreshTokenService.revoke = jest.fn()
      authService.clearRefreshToken = jest.fn()

      await controller.logout(req, res)
      expect(res.status).toBeCalledWith(204)
    })
  })
})
