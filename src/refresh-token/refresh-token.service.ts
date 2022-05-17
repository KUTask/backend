import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import * as dayjs from 'dayjs'
import { Types } from 'mongoose'
import { RefreshTokenModel } from 'src/models/refresh-token.model'
import { UserModel } from 'src/models/user.model'

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshTokenModel)
    private readonly refreshTokenModel: ReturnModelType<
      typeof RefreshTokenModel
    >,
  ) {}

  async create(user: Types.ObjectId, permanant = false): Promise<string> {
    const { _id }: DocumentType<RefreshTokenModel> =
      await this.refreshTokenModel.create({
        user,
        expired_at: permanant
          ? this.getPermantExpireDate()
          : this.getShortExpireDate(),
      })

    return _id.toHexString()
  }

  async revoke(id: Types.ObjectId) {
    const { _id } = await this.refreshTokenModel
      .findByIdAndUpdate(id, { expiredAt: new Date() }, { new: true })
      .exec()

    return _id.toHexString()
  }

  async refresh(id: Types.ObjectId) {
    const doc: DocumentType<RefreshTokenModel> = await this.refreshTokenModel
      .findOne({
        _id: id,
        expired_at: { $gt: new Date() },
      })
      .exec()

    if (!doc) {
      return null
    }

    doc.expiredAt = new Date()
    await doc.save()

    return this.create(<Types.ObjectId>doc.user)
  }

  async findUserByToken(id: Types.ObjectId): Promise<DocumentType<UserModel>> {
    const doc = await this.refreshTokenModel
      .findOne({
        _id: id,
        expired_at: { $gt: new Date() },
      })
      .select('user')
      .exec()

    if (!doc) {
      return null
    }

    const populatedDoc: DocumentType<RefreshTokenModel> = await doc.populate(
      'user',
    )

    return <DocumentType<UserModel>>populatedDoc.user
  }

  private getPermantExpireDate() {
    return dayjs().add(14, 'day').toDate()
  }

  private getShortExpireDate() {
    return dayjs().add(1, 'hour').toDate()
  }
}
