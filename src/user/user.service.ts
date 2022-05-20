import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import * as dayjs from 'dayjs'
import { auth } from 'firebase-admin'
import { FilterQuery, Types } from 'mongoose'
import { SectionModel } from 'src/models/section.model'
import { UserModel } from 'src/models/user.model'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ReturnModelType<typeof UserModel>,
  ) {}

  create(id: string, displayName: string, verifiedEmail = false) {
    return this.userModel.create({
      _id: id,
      displayName,
      expiredAt: !verifiedEmail ? dayjs().add(1, 'day').toDate() : null,
    })
  }

  findById(id: string): Promise<DocumentType<UserModel>> {
    return this.userModel.findById(id).exec()
  }

  find(query?: FilterQuery<DocumentType<UserModel>>) {
    return this.userModel.find(query).exec()
  }

  async createByAccessToken(token: string) {
    const payload = await auth().verifyIdToken(token, true)

    return this.create(payload.uid, payload.name)
  }

  async hasUser(id: string) {
    const count = await this.userModel.count({ _id: id }).exec()
    return !!count
  }

  updateDisplayName(id: string, displayName: string) {
    return this.userModel
      .findByIdAndUpdate(id, { displayName }, { new: true })
      .exec()
  }

  updateVerifiedEmail(id: string) {
    return this.userModel
      .findByIdAndUpdate(id, { expiredAt: null }, { new: true })
      .exec()
  }

  deleteFirebaseUser(id: string) {
    return auth().deleteUser(id)
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async clearExpiredUser() {
    this.logger.log('Clear user expired start')
    const todayDate = new Date()
    const expiredUser: DocumentType<UserModel>[] = await this.userModel
      .find({ expiredAt: { $lte: todayDate } })
      .select('_id')
      .exec()

    await Promise.all(
      expiredUser.map(async (doc) => {
        this.logger.log(`Delete user ${doc._id}`)
        await doc.delete()
        await this.deleteFirebaseUser(doc._id)
      }),
    )

    this.logger.log('Clear user expired end')
  }

  async findSectionsByUser(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('sections')
      .populate('sections')
      .exec()

    return <DocumentType<SectionModel>[]>user?.sections ?? null
  }

  registerSections(userId: string, sections: Types.ObjectId[]) {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $push: {
            sections: {
              $each: sections,
            },
          },
        },
        { new: true },
      )
      .exec()
  }
}
