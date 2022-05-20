import { getModelToken } from '@hirasawa_au/nestjs-typegoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import { Types } from 'mongoose'
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

  describe('findById', () => {
    it('should find a task by id', async () => {
      taskModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })
      const id = new Types.ObjectId()
      await service.findById(id)
      expect(taskModel.findById).toBeCalledWith(id)
    })
  })

  describe('create', () => {
    it('should create a task', async () => {
      taskModel.create = jest.fn()
      const section = new Types.ObjectId()
      const name = 'title'
      const description = 'description'
      const dueDate: Date = new Date()
      const tags = []
      const user = ''
      await service.create(name, section, dueDate, tags, user, description)
      expect(taskModel.create).toBeCalledWith({
        user,
        description,
        due_date: dueDate,
        name,
        section,
        tags,
      })
    })
  })

  describe('update', () => {
    it('should update a task', async () => {
      taskModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })
      const id = new Types.ObjectId()
      const name = 'title'
      const description = 'description'
      const dueDate: Date = new Date()
      const tags = []
      const user = ''
      await service.update(id, {
        name,
        due_date: dueDate,
        tags,
        user,
        description,
      })
      expect(taskModel.findByIdAndUpdate).toBeCalledWith(
        id,
        {
          user,
          description,
          due_date: dueDate,
          name,
          tags,
        },
        { new: true },
      )
    })
  })

  describe('delete', () => {
    it('should delete a task', async () => {
      taskModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      })
      const id = new Types.ObjectId()
      await service.delete(id)
      expect(taskModel.findByIdAndDelete).toBeCalledWith(id)
    })
  })

  describe('checkPermission', () => {
    it('should reject error if task not found', async () => {
      taskModel.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      })
      const id = new Types.ObjectId()
      const userId = 'userId'
      await expect(service.checkPermission(id, userId)).rejects.toThrowError()
    })

    it('should return false if task creator and request user is not same', async () => {
      taskModel.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue({ user: 'userId' }),
      })
      const id = new Types.ObjectId()
      const userId = 'userId_'
      await expect(service.checkPermission(id, userId)).resolves.toBe(false)
    })
  })
})
