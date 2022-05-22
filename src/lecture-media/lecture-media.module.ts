import { TypegooseModule } from '@hirasawa_au/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { LectureMediaModel } from 'src/models/lecture-media.model'
import { LectureMediaService } from './lecture-media.service'
import { LectureMediaResolver } from './lecture-media.resolver'

@Module({
  imports: [TypegooseModule.forFeature([LectureMediaModel])],
  providers: [LectureMediaService, LectureMediaResolver],
})
export class LectureMediaModule {}
