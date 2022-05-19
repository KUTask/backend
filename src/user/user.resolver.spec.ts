import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

jest.mock('./user.service')

describe('UserResolver', () => {
  let resolver: UserResolver
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
    service = module.get(UserService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('users', () => {
    it('should return users', async () => {
      service.find = jest.fn().mockResolvedValue([])
      expect(await resolver.users()).toEqual([])
    })
  })

  describe('createUser', () => {
    it('should not create a user if user is existed', async () => {
      service.hasUser = jest.fn().mockResolvedValue(true)
      await resolver.createUser({ uid: 'uid', name: 'name' })
      expect(service.create).not.toBeCalled()
    })

    it('should create a user if user is not existed', async () => {
      service.hasUser = jest.fn().mockResolvedValue(false)

      await resolver.createUser({ uid: 'uid', name: 'name' })
      expect(service.create).toBeCalled()
    })
  })

  describe('updateDisplayName', () => {
    it('should update display name', async () => {
      await resolver.updateDisplayName({ uid: 'uid' }, 'displayName')
      expect(service.updateDisplayName).toBeCalled()
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
