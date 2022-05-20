import { Test, TestingModule } from '@nestjs/testing'
import { Types } from 'mongoose'
import { UpdateTaskArgs } from './args/update-task.args'
import { TaskResolver } from './task.resolver'
import { TaskService } from './task.service'

jest.mock('./task.service')

describe('TaskResolver', () => {
  let resolver: TaskResolver
  let service: TaskService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskResolver, TaskService],
    }).compile()

    resolver = module.get<TaskResolver>(TaskResolver)
    service = module.get<TaskService>(TaskService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('task', () => {
    it('should service.findById be called with correct value', async () => {
      const taskId = new Types.ObjectId()
      await resolver.task(taskId.toHexString())
      expect(service.findById).toHaveBeenCalledWith(taskId)
    })
  })

  describe('createTask', () => {
    it('should service.create be called with correct value', async () => {
      const name = 'name'
      const section = new Types.ObjectId()
      const dueDate = Date.now().toString()
      const tags = []
      const user = ''
      const description = ''
      await resolver.createTask(
        {
          name,
          section: section.toHexString(),
          dueDate,
          tags,
          description,
        },
        { uid: user },
      )
      expect(service.create).toHaveBeenCalledWith(
        name,
        section,
        new Date(+dueDate),
        tags,
        user,
        description,
      )
    })
  })

  describe('updateTask', () => {
    it('should update to be called', async () => {
      const dto = new UpdateTaskArgs()
      await resolver.updateTask(dto)

      expect(service.update).toHaveBeenCalled()
    })
  })

  describe('deleteTask', () => {
    it('should delete to be called', async () => {
      const id = new Types.ObjectId()
      await resolver.deleteTask(id.toHexString())

      expect(service.delete).toHaveBeenCalledWith(id)
    })
  })

  describe('user', () => {
    it('should populate correctly', async () => {
      const doc = {
        populate: jest.fn().mockReturnThis(),
        user: {},
      }

      await resolver.user(doc)
      expect(doc.populate).toHaveBeenCalledWith('user')
    })
  })

  describe('section', () => {
    it('should populate correctly', async () => {
      const doc = {
        populate: jest.fn().mockReturnThis(),
        section: {},
      }

      await resolver.section(doc)
      expect(doc.populate).toHaveBeenCalledWith('section')
    })
  })
})
