import { getModelToken } from '@hirasawa_au/nestjs-typegoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { LectureMediaModel } from 'src/models/lecture-media.model'
import { LectureMediaService } from './lecture-media.service'

describe('LectureMediaService', () => {
  let service: LectureMediaService
  const lectureMediaModel = getModelForClass(LectureMediaModel)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureMediaService,
        {
          provide: getModelToken(LectureMediaModel.name),
          useValue: lectureMediaModel,
        },
      ],
    }).compile()

    service = module.get<LectureMediaService>(LectureMediaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
