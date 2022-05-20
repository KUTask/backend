import { TypegooseModule } from '@hirasawa_au/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { TaskModel } from 'src/models/task.model'
import { TaskService } from './task.service'

@Module({
  imports: [TypegooseModule.forFeature([TaskModel])],
  providers: [TaskService],
})
export class TaskModule {}
