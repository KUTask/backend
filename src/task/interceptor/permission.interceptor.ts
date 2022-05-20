import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { DecodedIdToken } from 'firebase-admin/auth'
import mercurius from 'mercurius'
import { Types } from 'mongoose'
import { Observable } from 'rxjs'
import { UpdateTaskArgs } from '../args/update-task.args'
import { TaskService } from '../task.service'

@Injectable()
export class PermissionInterceptor implements NestInterceptor {
  constructor(private readonly taskService: TaskService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const [, args, { user }]: [
      null,
      Pick<UpdateTaskArgs, 'id'>,
      DecodedIdToken,
    ] = context.getArgs()

    const permission = await this.taskService
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
