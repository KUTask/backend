import { getModelToken } from '@hirasawa_au/nestjs-typegoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import { UserModel } from 'src/models/user.model'
import { UserService } from './user.service'
import * as admin from 'firebase-admin'
import { Types } from 'mongoose'

jest.mock('firebase-admin', () => {
  const uid = 'uid'
  const name = 'name'

  const authResponse = {
    verifyIdToken: jest.fn().mockResolvedValue({
      uid,
      name,
    }),
  }

  return {
    auth: jest.fn().mockReturnValue(authResponse),
  }
})

describe('UserService', () => {
  let service: UserService
  const userModel = getModelForClass(UserModel)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken('UserModel'), useValue: userModel },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a user', async () => {
      userModel.create = jest.fn()
      const uid = 'uid'
      const displayName = 'displayName'
      await service.create(uid, displayName)
      expect(userModel.create).toBeCalledWith({
        uid,
        displayName,
      })
    })
  })

  describe('findById', () => {
    it('should find a user by id', async () => {
      userModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })
      const id = new Types.ObjectId('62847e792d8cb34bd2f2a107')
      await service.findById(id)
      expect(userModel.findById).toBeCalledWith(id)
    })
  })

  describe('findByUid', () => {
    it('should find a user by uid', async () => {
      userModel.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })
      const uid = 'uid'
      await service.findByUid(uid)
      expect(userModel.findOne).toBeCalledWith({ uid })
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
      const token = 'token'
      await service.createByAccessToken(token)

      expect(admin.auth).toBeCalled()
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
      const uid = 'uid'
      const result = await service.hasUser(uid)
      expect(result).toBeFalsy()
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
