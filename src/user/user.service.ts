import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin'
import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import { auth } from 'firebase-admin'
import { FilterQuery } from 'mongoose'
import { UserModel } from 'src/models/user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ReturnModelType<typeof UserModel>,
    private readonly firebaseAuth: FirebaseAuthenticationService,
  ) {}

  create(id: string, displayName: string) {
    return this.userModel.create({
      _id: id,
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
    const payload = await this.firebaseAuth.verifyIdToken(token, true)

    return this.create(payload.uid, payload.name)
  }

  async hasUser(id: string) {
    const count = await this.userModel.count({ id }).exec()
    return !!count
  }

  deleteFirebaseUser(id: string) {
    return this.firebaseAuth.deleteUser(id)
  }

  updateDisplayName(id: string, displayName: string) {
    return this.userModel
      .findByIdAndUpdate(id, { displayName }, { new: true })
      .exec()
  }
}
