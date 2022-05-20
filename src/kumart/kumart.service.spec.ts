import { Test, TestingModule } from '@nestjs/testing'
import { KumartService } from './kumart.service'
import { createClientInstance } from 'kuwrapper'
import { getModelForClass } from '@typegoose/typegoose'
import { SectionModel } from 'src/models/section.model'
import { SubjectModel } from 'src/models/subject.model'
import { SectionTypeModel } from 'src/models/section-type.model'
import { getModelToken } from '@hirasawa_au/nestjs-typegoose'

jest.mock('kuwrapper', () => ({
  createClientInstance: jest.fn().mockResolvedValue({
    getRegisteredCourses: jest
      .fn()
      .mockResolvedValue({ enrollSubjects: [{ sectionId: 0 }] }),

    getSectionDetail: jest.fn().mockResolvedValue({
      sectionDetail: { retur: 1 },
    }),
  }),
}))

describe('KumartService', () => {
  let service: KumartService
  const sectionModel = getModelForClass(SectionModel)
  const subjectModel = getModelForClass(SubjectModel)
  const sectionTypeModel = getModelForClass(SectionTypeModel)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KumartService,
        {
          provide: getModelToken('SectionModel'),
          useValue: sectionModel,
        },
        {
          provide: getModelToken('SubjectModel'),
          useValue: subjectModel,
        },
        {
          provide: getModelToken('SectionTypeModel'),
          useValue: sectionTypeModel,
        },
      ],
    }).compile()

    service = module.get<KumartService>(KumartService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getRegisteredCourse', () => {
    it('should getRegisterCourse be called with correct value', async () => {
      const username = 'username'
      const password = 'password'

      await service.getRegisteredCourses(username, password)
      expect(createClientInstance).toBeCalledWith(username, password)
      const client = await createClientInstance(username, password)
      expect(client.getRegisteredCourses).toBeCalled()
    })

    it('should call getSectionDetail ', async () => {
      const username = 'username'
      const password = 'password'

      await service.getRegisteredCourses(username, password)
      expect(createClientInstance).toBeCalledWith(username, password)
      const client = await createClientInstance(username, password)
      const detail = await client.getRegisteredCourses()
      expect(client.getSectionDetail).toBeCalledWith(
        detail.enrollSubjects[0].sectionId.toString(),
      )
    })

    it('should return correct value', async () => {
      const username = 'username'
      const password = 'password'

      const result = await service.getRegisteredCourses(username, password)
      expect(result).toEqual([{ retur: 1, sectionId: 0 }])
    })

    it('should not include sectionDetail if not found', async () => {
      const client = await createClientInstance('username', 'password')
      client.getSectionDetail = jest.fn().mockResolvedValue(null)
      const result = await service.getRegisteredCourses('username', 'password')
      expect(result).toEqual([{ sectionId: 0 }])
    })
  })
})
