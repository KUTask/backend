import { Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { SectionModel } from './section.model'
import { UserModel } from './user.model'

export class BaseModel {
  _id: Types.ObjectId

  user: Ref<UserModel, string>

  section: Ref<SectionModel>
}
