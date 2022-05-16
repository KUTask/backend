import { getModelToken } from '@hirasawa_au/nestjs-typegoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import * as dayjs from 'dayjs'
import { Types } from 'mongoose'
import { RefreshTokenModel } from '..//models/refresh-token.model'
import { RefreshTokenService } from './refresh-token.service'

describe('RefreshTokenService', () => {
  let service: RefreshTokenService
  const refreshTokenModel = getModelForClass(RefreshTokenModel)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenService,
        {
          provide: getModelToken('RefreshTokenModel'),
          useValue: refreshTokenModel,
        },
      ],
    }).compile()

    service = module.get<RefreshTokenService>(RefreshTokenService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create refreshtoken with correct user and correct permanant', async () => {
      refreshTokenModel.create = jest.fn().mockResolvedValue({
        _id: new Types.ObjectId(),
      })

      const userId = 'userId'
      await service.create(userId)
      expect(refreshTokenModel.create).toBeCalledWith({
        user: userId,
        expired_at: expect.any(Date),
      })
    })

    it('should create with shortdate expired if permanant is false', async () => {
      refreshTokenModel.create = jest.fn().mockResolvedValue({
        _id: new Types.ObjectId(),
      })

      const userId = 'userId'
      service['getShortExpireDate'] = jest.fn()
      await service.create(userId, false)

      expect(service['getShortExpireDate']).toBeCalled()
    })

    it('should create with permantdate expired if permanant is true', async () => {
      refreshTokenModel.create = jest.fn().mockResolvedValue({
        _id: new Types.ObjectId(),
      })

      const userId = 'userId'
      service['getPermantExpireDate'] = jest.fn()
      await service.create(userId, true)

      expect(service['getPermantExpireDate']).toBeCalled()
    })
  })

  describe('revoke', () => {
    it('should revoke refreshtoken with correct id', async () => {
      refreshTokenModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: new Types.ObjectId() }),
      })

      const id = new Types.ObjectId()
      await service.revoke(id)
      expect(refreshTokenModel.findByIdAndUpdate).toBeCalledWith(
        id,
        { expiredAt: expect.any(Date) },
        { new: true },
      )
    })
  })

  describe('refresh', () => {
    it('should return null if refreshtoken is expired', async () => {
      refreshTokenModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          expired_at: dayjs().subtract(1, 'day').toDate(),
        }),
      })

      const result = await service.refresh(new Types.ObjectId())

      expect(result).toBeNull()
    })

    it('should return null if refreshtoken not found', async () => {
      refreshTokenModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })

      const result = await service.refresh(new Types.ObjectId())

      expect(result).toBeNull()
    })

    it('should save be called when set oldrefreshtoken as expired', async () => {
      const mockedDoc = {
        _id: new Types.ObjectId(),
        expired_at: dayjs().add(1, 'day').toDate(),
        save: jest.fn(),
      }

      refreshTokenModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedDoc),
      })

      await service.refresh(new Types.ObjectId())

      expect(mockedDoc.save).toBeCalled()
    })

    it('should create refreshtoken with correct user id', async () => {
      const mockedDoc = {
        _id: new Types.ObjectId(),
        expired_at: dayjs().add(1, 'day').toDate(),
        user: 'userId',
        save: jest.fn(),
      }

      refreshTokenModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedDoc),
      })

      await service.refresh(new Types.ObjectId())

      expect(refreshTokenModel.create).toBeCalledWith({
        user: mockedDoc.user,
        expired_at: expect.any(Date),
      })
    })
  })
})
