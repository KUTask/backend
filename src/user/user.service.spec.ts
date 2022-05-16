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
        _id: 'id',
      }
      await service.create(
        user._id,
        user.displayName,
        user.profilePictureUrl,
        user.email,
      )
      expect(userModel.create).toBeCalledWith(user)
    })
  })

  describe('upsert', () => {
    it('should call update with upsert argument', async () => {
      userModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn(),
      })
      const user: Partial<UserModel> & { id: string } = {
        id: 'id',
        displayName: 'displayName',
        email: 'email',
        profilePictureUrl: 'profilePictureUrl',
      }

      await service.upsert(user)
      expect(userModel.findByIdAndUpdate).toBeCalledWith(
        user.id,
        {
          displayName: user.displayName,
          email: user.email,
          profilePictureUrl: user.profilePictureUrl,
        },
        { upsert: true, new: true },
      )
    })
  })

  describe('update', () => {
    it('should call update correctly', async () => {
      userModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn(),
      })
      const user: Partial<UserModel> & { id: string } = {
        id: 'id',
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
})
