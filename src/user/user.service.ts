import { Injectable } from '@nestjs/common'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import { UserModel } from 'src/models/user.model'

import { InjectModel } from '@hirasawa_au/nestjs-typegoose'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ReturnModelType<typeof UserModel>,
  ) {}

  findById(id: string): Promise<DocumentType<UserModel>> {
    return this.userModel.findById(id).exec()
  }

  async create(
    uid: string,
    displayName: string,
    profilePictureUrl: string,
    email: string,
  ): Promise<DocumentType<UserModel>> {
    return this.userModel.create({
      _id: uid,
      displayName,
      profilePictureUrl,
      email,
    })
  }

  update(data: Partial<UserModel> & { id: string }): Promise<UserModel> {
    const { id, ...updateField } = data
    return this.userModel
      .findByIdAndUpdate(id, updateField, { new: true })
      .exec()
  }

  upsert(
    user: Partial<Omit<UserModel, '_id'>> & { id: string },
  ): Promise<DocumentType<UserModel>> {
    const { id, ...updateField } = user
    return this.userModel
      .findByIdAndUpdate(id, updateField, { new: true, upsert: true })
      .exec()
  }
}
