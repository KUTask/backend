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

  describe('getSectionDetail', () => {
    it('should findOneAndUpdate be called correctly', async () => {
      subjectModel.findOneAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: 'subjectModelId' }),
      })
      sectionModel.findOneAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: 'sectionModelId' }),
      })
      sectionTypeModel.findOneAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: 'sectionTypeModelId' }),
      })

      const sections = [
        {
          sectionId: 0,
          schedules: [],
          teacher: [{ nameTh: 'nameTh', nameEn: 'nameEn' }] as any[],
          sectionType: 'sectionType',
          sectionTypeEn: 'sectionTypeEn',
          sectionTypeTh: 'sectionTypeTh',
          subjectCode: 'subjectCode',
          subjectNameEn: 'subjectNameEn',
          subjectNameTh: 'subjectNameTh',
        },
      ]
      await service.saveToDb(sections)
      expect(subjectModel.findOneAndUpdate).toBeCalledWith(
        { subject_code: sections[0].subjectCode },
        {
          subject_name_en: sections[0].subjectNameEn,
          subject_name_th: sections[0].subjectNameTh,
        },
        {
          new: true,
          upsert: true,
        },
      )

      expect(sectionTypeModel.findOneAndUpdate).toBeCalledWith(
        { section_type_id: sections[0].sectionType },
        {
          section_type_en: sections[0].sectionTypeEn,
          section_type_th: sections[0].sectionTypeTh,
        },
        {
          new: true,
          upsert: true,
        },
      )

      expect(sectionModel.findOneAndUpdate).toBeCalledWith(
        { section_id: sections[0].sectionId.toString() },
        {
          subject: 'subjectModelId',
          section_type: 'sectionTypeModelId',
          coursedate: sections[0].schedules,
          teacher_names: sections[0].teacher.map((teacher) => teacher.nameTh),
          teacher_names_en: sections[0].teacher.map(
            (teacher) => teacher.nameEn,
          ),
        },
        {
          new: true,
          upsert: true,
        },
      )
    })
  })
})
