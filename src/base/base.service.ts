import { Type } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { BaseModel } from 'src/models/base.model'

export class BaseService<T extends BaseModel = BaseModel> {
  constructor(protected readonly baseModel: ReturnModelType<Type<T>>) {}

  create(doc: Partial<T>) {
    return this.baseModel.create(doc)
  }

  update(id: Types.ObjectId, updateField: Partial<T>) {
    return this.baseModel
      .findByIdAndUpdate(id, updateField, { new: true })
      .exec()
  }

  findById(id: Types.ObjectId) {
    return this.baseModel.findById(id).exec()
  }

  find(section?: Types.ObjectId) {
    return this.baseModel.find(section ? { section } : null).exec()
  }

  delete(id: Types.ObjectId) {
    return this.baseModel.findByIdAndDelete(id).exec()
  }

  async checkPermission(id: Types.ObjectId, userId: string): Promise<boolean> {
    const doc = await this.baseModel.findById(id).select('user').exec()
    if (!doc) {
      return Promise.reject(new Error('Doc not found'))
    }
    return doc.user === userId
  }
}
