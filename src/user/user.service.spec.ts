import { getModelToken } from '@hirasawa_au/nestjs-typegoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { UserModel } from 'src/models/user.model'
import { UserService } from './user.service'

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

  describe('findById', () => {
    it('should call findById with correct id', async () => {
      const id = 'id'
      userModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn(),
      })
      await service.findById(id)
      expect(userModel.findById).toBeCalledWith(id)
    })
  })

  describe('create', () => {
    it('should call create with correct user', async () => {
      userModel.create = jest.fn()
      const user: Partial<UserModel> = {
        displayName: 'displayName',
        email: 'email',
        profilePictureUrl: 'profilePictureUrl',
        uid: 'uid',
      }
      await service.create(
        user.uid,
        user.displayName,
        user.profilePictureUrl,
        user.email,
      )
      expect(userModel.create).toBeCalledWith(user)
    })
  })

  describe('upsert', () => {
    it('should call findByUid correctly', async () => {
      service.findByUid = jest.fn().mockReturnValue({
        exec: jest.fn(),
      })

      service.update = jest.fn()
      service.create = jest.fn()
      const user: Partial<UserModel> & { uid: string } = {
        uid: 'id',
        displayName: 'displayName',
        email: 'email',
        profilePictureUrl: 'profilePictureUrl',
      }

      await service.upsert(user)
      expect(service.findByUid).toBeCalledWith(user.uid)
    })

    it('should call create when not have doc in exist', async () => {
      service.findByUid = jest.fn().mockResolvedValue(null)

      service.update = jest.fn()
      service.create = jest.fn()
      const user: Partial<UserModel> & { uid: string } = {
        uid: 'id',
        displayName: 'displayName',
        email: 'email',
        profilePictureUrl: 'profilePictureUrl',
      }

      await service.upsert(user)
      expect(service.create).toBeCalledWith(
        user.uid,
        user.displayName,
        user.profilePictureUrl,
        user.email,
      )
    })

    it('should call update when have doc in exist', async () => {
      const doc = { _id: new Types.ObjectId() }
      service.findByUid = jest.fn().mockResolvedValue(doc)

      service.update = jest.fn()
      service.create = jest.fn()
      const user: Partial<UserModel> & { uid: string } = {
        uid: 'id',
        displayName: 'displayName',
        email: 'email',
        profilePictureUrl: 'profilePictureUrl',
      }

      await service.upsert(user)
      expect(service.update).toBeCalledWith({
        id: doc._id,
        ...user,
      })
    })
  })

  describe('update', () => {
    it('should call update correctly', async () => {
      userModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn(),
      })
      const user: Partial<UserModel> & { id: Types.ObjectId } = {
        id: new Types.ObjectId('62826d07b589eb96977eda1b'),
        displayName: 'displayName',
        email: 'email',
        profilePictureUrl: 'profilePictureUrl',
      }

      await service.update(user)
      expect(userModel.findByIdAndUpdate).toBeCalledWith(
        user.id,
        {
          displayName: user.displayName,
          email: user.email,
          profilePictureUrl: user.profilePictureUrl,
        },
        { new: true },
      )
    })
  })

  describe('findByUid', () => {
    it('should call findOne with correct uid', async () => {
      userModel.findOne = jest.fn().mockReturnValue({
        exec: jest.fn(),
      })
      const uid = 'uid'
      await service.findByUid(uid)
      expect(userModel.findOne).toBeCalledWith({ uid })
    })
  })
})
