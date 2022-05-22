import { getModelToken } from '@hirasawa_au/nestjs-typegoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import { TaskModel } from 'src/models/task.model'
import { TaskService } from './task.service'

describe('TaskService', () => {
  let service: TaskService
  const taskModel = getModelForClass(TaskModel)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: getModelToken(TaskModel.name), useValue: taskModel },
      ],
    }).compile()

    service = module.get<TaskService>(TaskService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
