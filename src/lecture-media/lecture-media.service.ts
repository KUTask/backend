import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable, Type } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { BaseService } from 'src/base/base.service'
import { LectureMediaModel } from 'src/models/lecture-media.model'

@Injectable()
export class LectureMediaService extends BaseService<LectureMediaModel> {
  constructor(
    @InjectModel(LectureMediaModel)
    lectureMediaModel: ReturnModelType<Type<LectureMediaModel>>,
  ) {
    super(lectureMediaModel)
  }
}
