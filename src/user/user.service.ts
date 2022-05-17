import { Injectable } from '@nestjs/common'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import { UserModel } from 'src/models/user.model'

import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Types } from 'mongoose'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ReturnModelType<typeof UserModel>,
  ) {}

  findById(id: string): Promise<DocumentType<UserModel>> {
    return this.userModel.findById(id).exec()
  }

  findByUid(uid: string): Promise<DocumentType<UserModel>> {
    return this.userModel.findOne({ uid }).exec()
  }

  async create(
    uid: string,
    displayName: string,
    profilePictureUrl: string,
    email: string,
  ): Promise<DocumentType<UserModel>> {
    return this.userModel.create({
      uid,
      displayName,
      profilePictureUrl,
      email,
    })
  }

  update(
    data: Partial<UserModel> & { id: Types.ObjectId },
  ): Promise<DocumentType<UserModel>> {
    const { id, ...updateField } = data
    return this.userModel
      .findByIdAndUpdate(id, updateField, { new: true })
      .exec()
  }

  async upsert(
    user: Partial<Omit<UserModel, '_id'>> & { uid: string },
  ): Promise<DocumentType<UserModel>> {
    const doc = await this.findByUid(user.uid)
    const updatePayload = {
      id: doc?._id,
      ...user,
    }
    return doc
      ? this.update(updatePayload)
      : this.create(
          user.uid,
          user.displayName,
          user.profilePictureUrl,
          user.email,
        )
  }
}
