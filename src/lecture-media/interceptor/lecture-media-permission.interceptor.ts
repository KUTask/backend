import { Injectable } from '@nestjs/common'
import { BasePermissionInterceptor } from 'src/base/interceptors/base-permission.interceptor'
import { LectureMediaService } from '../lecture-media.service'

@Injectable()
export class LectureMediaPermissionInterceptor extends BasePermissionInterceptor {
  constructor(lectureMediaService: LectureMediaService) {
    super(lectureMediaService)
  }
}
