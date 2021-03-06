import { Test, TestingModule } from '@nestjs/testing'
import { Types } from 'mongoose'
import { SectionResolver } from './section.resolver'
import { SectionService } from './section.service'

jest.mock('./section.service')

describe('SectionResolver', () => {
  let resolver: SectionResolver
  let service: SectionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionResolver, SectionService],
    }).compile()

    resolver = module.get<SectionResolver>(SectionResolver)
    service = module.get<SectionService>(SectionService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('registeredSection', () => {
    it('should service.findRegisterCourses be called with correct value', async () => {
      const uid = 'uid'
      await resolver.registeredSections({ uid })
      expect(service.findRegisteredCourses).toHaveBeenCalledWith(uid)
    })
  })

  describe('section', () => {
    it('should service.findById be called with correct value', async () => {
      const id = new Types.ObjectId()
      await resolver.section(id.toHexString())
      expect(service.findById).toHaveBeenCalledWith(id)
    })
  })

  describe('register', () => {
    it('should service.registerSections be called with correct value', async () => {
      const uid = 'uid'
      const sectionIds = [
        '6287b219064f9742b11a37b6',
        '6287b21a064f9742b11a37b7',
      ]
      await resolver.register({ uid }, sectionIds)
      expect(service.registerSections).toHaveBeenCalledWith(
        uid,
        sectionIds.map((id) => new Types.ObjectId(id)),
      )
    })
  })

  describe('subject', () => {
    it('should popuate correctly', async () => {
      const section = {
        populate: jest.fn().mockReturnThis(),
        subject: '',
      }

      await resolver.subject(section)
      expect(section.populate).toHaveBeenCalledWith('subject')
    })
  })

  describe('sectionType', () => {
    it('should popuate correctly', async () => {
      const section = {
        populate: jest.fn().mockReturnThis(),
        sectionType: '',
      }

      await resolver.sectionType(section)
      expect(section.populate).toHaveBeenCalledWith('section_type')
    })
  })

  describe('tasks', () => {
    it('should popuate correctly', async () => {
      const section = {
        populate: jest.fn().mockReturnThis(),
        tasks: [],
      }

      await resolver.tasks(section)
      expect(section.populate).toHaveBeenCalledWith('tasks')
    })
  })

  describe('lectureMedias', () => {
    it('should popuate correctly', async () => {
      const section = {
        populate: jest.fn().mockReturnThis(),
        lectureMedias: [],
      }

      await resolver.lectureMedias(section)
      expect(section.populate).toHaveBeenCalledWith('lecture_medias')
    })
  })
})
