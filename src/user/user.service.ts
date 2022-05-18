import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import { auth } from 'firebase-admin'
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

  async createByAccessToken(token: string) {
    const payload = await auth().verifyIdToken(token, true)

    return this.create(payload.uid, payload.name)
  }

  async hasUser(uid: string) {
    const count = await this.userModel.count({ uid }).exec()
    return !!count
  }
}
