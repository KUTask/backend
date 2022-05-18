import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import { getAuth } from 'firebase-admin/auth'
import { FilterQuery, Types } from 'mongoose'
import { UserModel } from 'src/models/user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ReturnModelType<typeof UserModel>,
  ) {}

  create(uid: string, displayName: string) {
    return this.userModel.create({
      uid,
      displayName,
    })
  }

  findById(id: Types.ObjectId): Promise<DocumentType<UserModel>> {
    return this.userModel.findById(id).exec()
  }

  findByUid(uid: string): Promise<DocumentType<UserModel>> {
    return this.userModel.findOne({ uid }).exec()
  }

  find(query?: FilterQuery<DocumentType<UserModel>>) {
    return this.userModel.find(query).exec()
  }

  async upsertByAccessToken(token: string) {
    const payload = await getAuth().verifyIdToken(token, true)

    return this.create(payload.uid, payload.name)
  }

  upsertByPayload(uid: string, displayName: string) {
    return this.create(uid, displayName)
  }

  hasUser(uid: string) {
    return this.userModel.count({ uid }).exec()
  }
}
