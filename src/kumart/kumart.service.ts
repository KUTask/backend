import { Injectable } from '@nestjs/common'
import { createClientInstance, EnrollSubject } from 'kuwrapper'
import { SectionModel } from 'src/models/section.model'
import { SubjectModel } from 'src/models/subject.model'

@Injectable()
export class KumartService {
  async getRegisteredCourses(username: string, password: string) {
    const client = await createClientInstance(username, password)
    const res = await client.getRegisteredCourses()
    return res.enrollSubjects
  }
}
