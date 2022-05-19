import { Test, TestingModule } from '@nestjs/testing'
import { KumartService } from './kumart.service'
import { createClientInstance } from 'kuwrapper'

jest.mock('kuwrapper', () => ({
  createClientInstance: jest.fn().mockResolvedValue({
    getRegisteredCourses: jest.fn().mockResolvedValue({}),
  }),
}))

describe('KumartService', () => {
  let service: KumartService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KumartService],
    }).compile()

    service = module.get<KumartService>(KumartService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getRegisteredCourse', () => {
    it('should getRegisterCourse be called with correct value', async () => {
      const username = 'username'
      const password = 'password'

      await service.getRegisteredCourses(username, password)
      expect(createClientInstance).toBeCalledWith(username, password)
      const client = await createClientInstance(username, password)
      expect(client.getRegisteredCourses).toBeCalled()
    })
  })
})
