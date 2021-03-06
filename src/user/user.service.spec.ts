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

    deleteUser: jest.fn(),
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
      const id = 'uid'
      const displayName = 'displayName'
      const email = 'email'
      await service.create(id, displayName, email)
      expect(userModel.create).toBeCalledWith({
        _id: id,
        displayName,
        expiredAt: expect.any(Date),
        email,
      })
    })

    it('should create user not expired if verified email', async () => {
      userModel.create = jest.fn()
      const id = 'uid'
      const displayName = 'displayName'
      const email = 'email'
      await service.create(id, displayName, email, true)
      expect(userModel.create).toBeCalledWith({
        _id: id,
        displayName,
        expiredAt: null,
        email,
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
          display_name: displayName,
        },
        { new: true },
      )
    })
  })

  describe('updateVerifiedEmail', () => {
    it('should update verified email', async () => {
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
      const mockedDeleteUser = admin.auth().deleteUser
      const id = 'id'
      await service.deleteFirebaseUser(id)
      expect(mockedDeleteUser).toBeCalledWith(id)
    })
  })

  describe('clearExpiredUser', () => {
    it('should clear expired user', async () => {
      const doc = {
        _id: 'id',
        delete: jest.fn(),
      }
      const docs = [doc]
      userModel.find = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(docs),
      })

      await service.clearExpiredUser()
      expect(doc.delete).toBeCalled()
    })
  })

  describe('findSectionsByUser', () => {
    it('should find sections by user', async () => {
      userModel.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue({ sections: [] }),
      })

      const result = await service.findSectionsByUser('id')
      expect(userModel.findById).toBeCalledWith('id')
      expect(result).not.toBeNull()
    })

    it('should return null if user does not exist', async () => {
      userModel.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      })

      const result = await service.findSectionsByUser('id')
      expect(userModel.findById).toBeCalledWith('id')
      expect(result).toBeNull()
    })
  })

  describe('registerSections', () => {
    it('should register sections', async () => {
      userModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })

      const sections = [new Types.ObjectId(), new Types.ObjectId()]
      const userId = 'id'
      await service.registerSections(userId, sections)

      expect(userModel.findByIdAndUpdate).toBeCalledWith(
        userId,
        {
          sections,
        },
        { new: true },
      )
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
