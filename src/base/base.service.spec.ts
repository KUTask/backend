import { Types } from 'mongoose'
import { BaseModel } from 'src/models/base.model'
import { BaseService } from './base.service'

describe('BaseService', () => {
  let service: BaseService<BaseModel>

  const query = {
    select: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(null),
  }

  const baseModel = {
    findById: jest.fn().mockReturnValue(query),
    find: jest.fn().mockReturnValue(query),
    findOne: jest.fn().mockReturnValue(query),
    create: jest.fn().mockResolvedValue(null),
    findByIdAndUpdate: jest.fn().mockReturnValue(query),
    findByIdAndDelete: jest.fn().mockReturnValue(query),
  }
  beforeEach(() => {
    service = new BaseService(baseModel as any)
  })

  describe('checkPermission', () => {
    it('should reject if lecture doc not found', async () => {
      baseModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
        select: jest.fn().mockReturnThis(),
      })

      const id = new Types.ObjectId()
      const userId = 'userId'
      await expect(service.checkPermission(id, userId)).rejects.toThrow()
    })

    it('should return boolean if doc found', async () => {
      const mockedDoc = {
        user: 'userId',
      }

      const user = 'userId'
      baseModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedDoc),
        select: jest.fn().mockReturnThis(),
      })

      const lectureMediaId = new Types.ObjectId()

      const result = await service.checkPermission(lectureMediaId, user)

      expect(baseModel.findById).toHaveBeenCalledWith(lectureMediaId)
      expect(result).toBe(user === mockedDoc.user)
    })
  })

  describe('create', () => {
    it('should create a base doc with correct value', async () => {
      const section = new Types.ObjectId()
      const user = 'user'

      await service.create({
        section,
        user,
      })
      expect(baseModel.create).toHaveBeenCalledWith({
        section,
        user,
      })
    })
  })

  describe('find', () => {
    it('should find with correct section', async () => {
      baseModel.find = jest.fn().mockReturnValue({
        exec: jest.fn(),
      })

      const section = new Types.ObjectId()

      await service.find(section)

      expect(baseModel.find).toHaveBeenCalledWith({ section })
    })

    it('should return all doc if section is undefined', async () => {
      baseModel.find = jest.fn().mockReturnValue({
        exec: jest.fn(),
      })

      await service.find()
      expect(baseModel.find).toHaveBeenCalledWith(null)
    })
  })

  describe('findById', () => {
    it('should find by correct id', async () => {
      baseModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn(),
      })

      const id = new Types.ObjectId()
      await service.findById(id)
      expect(baseModel.findById).toHaveBeenCalledWith(id)
    })
  })

  describe('update', () => {
    it('should update with correct id and updateField', async () => {
      baseModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn(),
      })

      const id = new Types.ObjectId()
      const updateField = {
        name: 'name',
        link: 'link',
        icon: 'icon',
        description: 'description',
        section: new Types.ObjectId(),
        user: 'user',
      }

      await service.update(id, updateField)
      expect(baseModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        updateField,
        {
          new: true,
        },
      )
    })
  })

  describe('delete', () => {
    it('should delete with correct id', async () => {
      baseModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn(),
      })

      const id = new Types.ObjectId()
      await service.delete(id)
      expect(baseModel.findByIdAndDelete).toHaveBeenCalledWith(id)
    })
  })
})
