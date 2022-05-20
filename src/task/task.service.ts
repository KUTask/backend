import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { TaskModel } from 'src/models/task.model'

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel)
    private readonly taskModel: ReturnModelType<typeof TaskModel>,
  ) {}

  findById(id: Types.ObjectId) {
    return this.taskModel.findById(id).exec()
  }

  create(
    name: string,
    section: Types.ObjectId,
    dueDate: Date,
    tags: string[],
    user: string,
    description?: string,
  ) {
    return this.taskModel.create({
      user,
      description,
      due_date: dueDate,
      name,
      section,
      tags,
    })
  }

  update(id: Types.ObjectId, updateField: Partial<TaskModel>) {
    return this.taskModel
      .findByIdAndUpdate(id, updateField, { new: true })
      .exec()
  }

  delete(id: Types.ObjectId) {
    return this.taskModel.findByIdAndDelete(id).exec()
  }

  async checkPermission(id: Types.ObjectId, userId: string): Promise<boolean> {
    const task = await this.taskModel.findById(id).select('user').exec()
    if (!task) {
      return Promise.reject(new Error('Task not found'))
    }
    console.log(task.user)
    return task.user === userId
  }
}
