import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { ReturnModelType, DocumentType } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { SectionModel } from 'src/models/section.model'
import { UserService } from 'src/user/user.service'

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(SectionModel)
    private readonly sectionModel: ReturnModelType<typeof SectionModel>,
    private readonly userService: UserService,
  ) {}

  findById(id: Types.ObjectId) {
    return this.sectionModel.findById(id).exec()
  }

  findRegisteredCourses(userId: string) {
    return this.userService.findSectionsByUser(userId)
  }

  async registerSections(userId: string, sectionIds: Types.ObjectId[]) {
    const user = await this.userService.registerSections(userId, sectionIds)

    const populatedUser = await user?.populate('sections')

    return <DocumentType<SectionModel>[]>populatedUser?.sections
  }
}
