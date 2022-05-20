import { registerDecorator } from 'class-validator'
import { isObjectIdOrHexString } from 'mongoose'

export function IsObjectId(): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsObjectId',
      target: object.constructor,
      propertyName,
      validator: {
        validate(value: any) {
          return isObjectIdOrHexString(value)
        },
      },
    })
  }
}
