import { Test, TestingModule } from '@nestjs/testing'
import { Types } from 'mongoose'
import { CreateLectureMediaArgs } from './args/create-lecture-media.args'
import { UpdateLectureMediaArgs } from './args/update-lecture-media'
import { LectureMediaResolver } from './lecture-media.resolver'
import { LectureMediaService } from './lecture-media.service'

jest.mock('./lecture-media.service')

describe('LectureMediaResolver', () => {
  let resolver: LectureMediaResolver
  let service: LectureMediaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureMediaResolver, LectureMediaService],
    }).compile()

    resolver = module.get<LectureMediaResolver>(LectureMediaResolver)
    service = module.get<LectureMediaService>(LectureMediaService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('lectureMedialectureMediasType', () => {
    it('should service.find be called with section if section', async () => {
      const section = new Types.ObjectId()
      await resolver.lectureMedialectureMediasType(section.toHexString())
      expect(service.find).toHaveBeenCalledWith(section)
    })

    it('should service.find be called with null if not section', async () => {
      await resolver.lectureMedialectureMediasType()
      expect(service.find).toHaveBeenCalledWith(null)
    })
  })

  describe('lectureMedialectureMediaType', () => {
    it('should service.findById be called with id', async () => {
      const id = new Types.ObjectId()
      await resolver.lectureMedialectureMediaType(id.toHexString())
      expect(service.findById).toHaveBeenCalledWith(id)
    })
  })

  describe('lectureMediaCreateLectureMedia', () => {
    it('should service.create be called with correct value', async () => {
      const dto = new CreateLectureMediaArgs()
      const section = new Types.ObjectId()
      dto.name = 'name'
      dto.section = section.toHexString()
      dto.description = ''
      dto.icon = ''
      dto.link = ''

      await resolver.lectureMediaCreateLectureMedia(dto, { uid: '' })

      expect(service.create).toHaveBeenCalledWith({
        name: dto.name,
        section,
        user: '',
        description: dto.description,
        icon: dto.icon,
        link: dto.link,
      })
    })
  })

  describe('lectureMediaUpdateLectureMedia', () => {
    it('should service.update be called with correct value', async () => {
      const lectureId = new Types.ObjectId()
      const dto = new UpdateLectureMediaArgs()
      dto.id = lectureId.toHexString()
      dto.name = 'name'
      dto.description = ''
      dto.icon = ''
      dto.link = ''

      await resolver.lectureMediaUpdateLectureMedia(dto)

      const { id, ...field } = dto
      expect(service.update).toHaveBeenCalledWith(lectureId, field)
    })
  })

  describe('lectureMediaDeleteLectureMedia', () => {
    it('should service.delete be called with correct value', async () => {
      const id = new Types.ObjectId()
      await resolver.lectureMediaDeleteLectureMedia(id.toHexString())
      expect(service.delete).toHaveBeenCalledWith(id)
    })
  })

  describe('section', () => {
    it('should populate correctly', async () => {
      const doc = {
        populate: jest.fn().mockReturnThis(),
        section: null,
      }

      await resolver.section(doc as any)
      expect(doc.populate).toHaveBeenCalledWith('section')
    })
  })

  describe('user', () => {
    it('should populate correctly', async () => {
      const doc = {
        populate: jest.fn().mockReturnThis(),
        user: null,
      }

      await resolver.user(doc as any)
      expect(doc.populate).toHaveBeenCalledWith('user')
    })
  })
})
