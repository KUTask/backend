import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'
import { User } from './user.class'
import { UserPayload } from './user.payload'

jest.mock('src/user/user.service')
jest.mock('@nestjs/jwt')

describe('AuthService', () => {
  let service: AuthService
  let jwtService: JwtService
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, UserService],
    }).compile()

    service = module.get<AuthService>(AuthService)
    jwtService = module.get<JwtService>(JwtService)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('sign', () => {
    it('should signAsync be called with correct userId', async () => {
      const payload: UserPayload = {
        displayName: 'displayName',
        email: 'email',
        id: 'id',
        profilePictureUrl: 'profilePictureUrl',
      }
      jwtService.signAsync = jest.fn().mockResolvedValue('token')
      const token = await service.sign(payload)
      expect(jwtService.signAsync).toBeCalledWith(payload, {
        expiresIn: '5m',
      })

      expect(token).toBe('token')
    })
  })

  describe('verify', () => {
    it('should call verifyAsync with correct token', async () => {
      const payload: UserPayload = {
        displayName: 'displayName',
        email: 'email',
        id: 'id',
        profilePictureUrl: 'profilePictureUrl',
      }

      jwtService.verifyAsync = jest.fn().mockResolvedValue(payload)
      const user = await service.verify('token')
      expect(jwtService.verifyAsync).toBeCalledWith('token')

      const expectedUser = new User()
      expectedUser.displayName = payload.displayName
      expectedUser.email = payload.email
      expectedUser.id = payload.id
      expectedUser.profilePictureUrl = payload.profilePictureUrl

      expect(user).toEqual(expectedUser)
    })
  })

  describe('setTokenInCookie', () => {
    it('should setCookie to be called 2 times with correct value', async () => {
      const res = {
        setCookie: jest.fn(),
      }
      const accessToken = 'accessToken'
      const refreshToken = 'refreshToken'
      service.setTokenInCookie(res, accessToken, refreshToken)
      expect(res.setCookie).toBeCalledTimes(2)
      expect(res.setCookie).toBeCalledWith('access_token', accessToken, {
        expires: expect.any(Date),
      })
      expect(res.setCookie).toBeCalledWith('refresh_token', refreshToken, {
        expires: expect.any(Date),
      })
    })
  })

  describe('clearAccessToken', () => {
    it('should clearCookie to be called with correct value', async () => {
      const res = {
        clearCookie: jest.fn(),
      }
      service.clearAccessToken(res)
      expect(res.clearCookie).toBeCalledWith('access_token')
    })
  })

  describe('clearRefreshToken', () => {
    it('should clearCookie to be called with correct value', async () => {
      const res = {
        clearCookie: jest.fn(),
      }
      service.clearRefreshToken(res)
      expect(res.clearCookie).toBeCalledWith('refresh_token')
    })
  })
})
