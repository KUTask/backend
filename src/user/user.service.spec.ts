import { getModelToken } from '@hirasawa_au/nestjs-typegoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import { UserModel } from 'src/models/user.model'
import { UserService } from './user.service'
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin'

jest.mock('@aginix/nestjs-firebase-admin')

describe('UserService', () => {
  let service: UserService
  const userModel = getModelForClass(UserModel)
  let firebaseAuthService: FirebaseAuthenticationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken('UserModel'), useValue: userModel },
        FirebaseAuthenticationService,
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    firebaseAuthService = module.get(FirebaseAuthenticationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a user', async () => {
      userModel.create = jest.fn()
      const id = 'uid'
      const displayName = 'displayName'
      await service.create(id, displayName)
      expect(userModel.create).toBeCalledWith({
        _id: id,
        displayName,
        expiredAt: expect.any(Date),
      })
    })

    it('should create user not expired if verified email', async () => {
      userModel.create = jest.fn()
      const id = 'uid'
      const displayName = 'displayName'
      await service.create(id, displayName, true)
      expect(userModel.create).toBeCalledWith({
        _id: id,
        displayName,
        expiredAt: null,
      })
    })
  })

  describe('findById', () => {
    it('should find a user by id', async () => {
      userModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })
      const id = '35l7ARKMTKVsiavIq6KjDz5yEh92'
      await service.findById(id)
      expect(userModel.findById).toBeCalledWith(id)
    })
  })

  describe('find', () => {
    it('should find users', async () => {
      userModel.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })

      await service.find()
      expect(userModel.find).toBeCalled()
    })
  })

  describe('createByAccessToken', () => {
    it('should craete a user from correct token', async () => {
      service.create = jest.fn()
      firebaseAuthService.verifyIdToken = jest.fn().mockResolvedValue({
        uid: 'uid',
        name: 'name',
      })
      const token = 'token'
      await service.createByAccessToken(token)

      expect(firebaseAuthService.verifyIdToken).toBeCalledWith(token, true)
      expect(service.create).toBeCalled()
    })
  })

  describe('hasUser', () => {
    it('should return true if user exists', async () => {
      userModel.count = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(1),
      })
      const uid = 'uid'
      const result = await service.hasUser(uid)
      expect(result).toBeTruthy()
    })

    it('should return false if user does not exist', async () => {
      userModel.count = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(0),
      })
      const uid = '35l7ARKMTKVsiavIq6KjDz5yEh92'
      const result = await service.hasUser(uid)
      expect(result).toBeFalsy()
    })
  })

  describe('updateDisplayName', () => {
    it('should update display name', async () => {
      userModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })
      const id = '35l7ARKMTKVsiavIq6KjDz5yEh92'
      const displayName = 'displayName'
      await service.updateDisplayName(id, displayName)
      expect(userModel.findByIdAndUpdate).toBeCalledWith(
        id,
        {
          displayName,
        },
        { new: true },
      )
    })
  })

  describe('updateVerifiedEmail', () => {
    it('should verify email', async () => {
      userModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })
      const id = '35l7ARKMTKVsiavIq6KjDz5yEh92'
      await service.updateVerifiedEmail(id)
      expect(userModel.findByIdAndUpdate).toBeCalledWith(
        id,
        {
          expiredAt: null,
        },
        { new: true },
      )
    })
  })

  describe('deleteFirebaseUser', () => {
    it('should delete firebase user', async () => {
      const uid = 'uid'
      await service.deleteFirebaseUser(uid)
      expect(firebaseAuthService.deleteUser).toBeCalledWith(uid)
    })
  })

  describe('clearExpiredUser', () => {
    it('should clear expired user', async () => {
      userModel.find = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([{ _id: 'uid', delete: jest.fn() }]),
      })

      service.deleteFirebaseUser = jest.fn()

      await service.clearExpiredUser()
      expect(userModel.find).toBeCalled()
      expect(service.deleteFirebaseUser).toBeCalledWith('uid')
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
