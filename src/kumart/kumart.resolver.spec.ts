import { Test, TestingModule } from '@nestjs/testing'
import { KumartResolver } from './kumart.resolver'
import { KumartService } from './kumart.service'

jest.mock('./kumart.service')

describe('KumartResolver', () => {
  let resolver: KumartResolver
  let service: KumartService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KumartResolver, KumartService],
    }).compile()

    resolver = module.get<KumartResolver>(KumartResolver)
    service = module.get<KumartService>(KumartService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('sections', () => {
    it('should service.getRegisteredCourses be called with correct value', async () => {
      const username = 'username'
      const password = 'password'

      await resolver.sections({ username, password })
      expect(service.getRegisteredCourses).toBeCalledWith(username, password)
    })
  })
})
