import { getModelToken } from '@hirasawa_au/nestjs-typegoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { SectionModel } from 'src/models/section.model'
import { UserService } from 'src/user/user.service'
import { SectionService } from './section.service'

jest.mock('src/user/user.service')
describe('SectionService', () => {
  let service: SectionService
  let userService: UserService
  const sectionModel = getModelForClass(SectionModel)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        UserService,
        {
          provide: getModelToken(SectionModel.name),
          useValue: sectionModel,
        },
      ],
    }).compile()

    service = module.get<SectionService>(SectionService)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findById', () => {
    it('should findById be called correctly', async () => {
      const id = new Types.ObjectId('6287b219064f9742b11a37b6')
      sectionModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })
      await service.findById(id)
      expect(sectionModel.findById).toHaveBeenCalledWith(id)
    })
  })

  describe('findRegisteredCourses', () => {
    it('should findRegisteredCourses be called correctly', async () => {
      const userId = 'uid'
      userService.findSectionsByUser = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })
      await service.findRegisteredCourses(userId)
      expect(userService.findSectionsByUser).toHaveBeenCalledWith(userId)
    })
  })

  describe('registerSections', () => {
    it('should registerSections be called correctly', async () => {
      const userId = 'uid'
      const sectionIds = [
        '6287b219064f9742b11a37b6',
        '6287b21a064f9742b11a37b7',
      ]
      const sectionIdsMongoose = sectionIds.map((id) => new Types.ObjectId(id))
      const doc = {
        populate: jest.fn().mockReturnThis(),
        sections: [],
      }
      userService.registerSections = jest.fn().mockResolvedValue(doc)
      await service.registerSections(userId, sectionIdsMongoose)
      expect(userService.registerSections).toHaveBeenCalledWith(
        userId,
        sectionIdsMongoose,
      )
    })

    it('should not called populate if user return null', async () => {
      const userId = 'uid'
      const sectionIds = [
        '6287b219064f9742b11a37b6',
        '6287b21a064f9742b11a37b7',
      ]
      const sectionIdsMongoose = sectionIds.map((id) => new Types.ObjectId(id))
      userService.registerSections = jest.fn().mockResolvedValue(null)
      expect(
        await service.registerSections(userId, sectionIdsMongoose),
      ).toBeNull()
    })
  })
})
