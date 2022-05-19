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

  create(id: string, displayName: string) {
    return this.userModel.create({
      id,
      displayName,
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
    const count = await this.userModel.count({ id }).exec()
    return !!count
  }

  updateDisplayName(id: string, displayName: string) {
    return this.userModel
      .findByIdAndUpdate(id, { displayName }, { new: true })
      .exec()
  }
}
