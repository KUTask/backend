import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { DecodedIdToken } from 'firebase-admin/auth'
import mercurius from 'mercurius'
import { Types } from 'mongoose'
import { Observable } from 'rxjs'
import { UpdateTaskArgs } from 'src/task/args/update-task.args'
import { BaseService } from '../base.service'

export class BasePermissionInterceptor implements NestInterceptor {
  constructor(private readonly baseService: BaseService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const [, args, { user }]: [
      null,
      Pick<UpdateTaskArgs, 'id'>,
      DecodedIdToken,
    ] = context.getArgs()

    const permission = await this.baseService
      .checkPermission(new Types.ObjectId(args.id), user.uid)
      .catch(
        (e: Error) =>
          new mercurius.ErrorWithProps(
            e.message,
            {
              code: 'BAD_USER_INPUT',
            },
            400,
          ),
      )

    if (!permission) {
      throw new mercurius.ErrorWithProps(
        'Permission denied',
        {
          code: 'PERMISSION_DENIED',
        },
        403,
      )
    }

    return next.handle()
  }
}
