import { Injectable } from '@nestjs/common'
import { BasePermissionInterceptor } from 'src/base/interceptors/base-permission.interceptor'
import { TaskService } from '../task.service'

@Injectable()
export class TaskPermissionInterceptor extends BasePermissionInterceptor {
  constructor(taskService: TaskService) {
    super(taskService)
  }
}
