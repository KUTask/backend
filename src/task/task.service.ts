import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { BaseService } from 'src/base/base.service'
import { TaskModel } from 'src/models/task.model'

@Injectable()
export class TaskService extends BaseService<TaskModel> {
  constructor(
    @InjectModel(TaskModel)
    taskModel: ReturnModelType<typeof TaskModel>,
  ) {
    super(taskModel)
  }
}
