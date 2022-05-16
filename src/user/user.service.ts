import { Injectable } from '@nestjs/common'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import { UserModel } from 'src/models/user.model'

@Injectable()
export class UserService {
  constructor(private readonly userModel: ReturnModelType<typeof UserModel>) {}

  findById(id: string): Promise<DocumentType<UserModel>> {
    return this.userModel.findById(id).exec()
  }

  async create(
    uid: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
  ): Promise<DocumentType<UserModel>> {
    return this.userModel.create({
      id: uid,
      firstName,
      lastName,
      username,
      email,
    })
  }

  update(data: Partial<UserModel> & { id: string }): Promise<UserModel> {
    const { id, ...updateField } = data
    return this.userModel
      .findByIdAndUpdate(id, updateField, { new: true })
      .exec()
  }
}
