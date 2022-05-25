import { UseInterceptors } from '@nestjs/common'
import {
  Args,
  Directive,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { DocumentType } from '@typegoose/typegoose'
import { DecodedIdToken } from 'firebase-admin/auth'
import { mapKeys, snakeCase } from 'lodash'
import { Types } from 'mongoose'
import { TaskModel } from 'src/models/task.model'
import { SectionType } from 'src/section/gql/section-type.gql'
import { User } from 'src/user/user.decorator'
import { User as UserModel } from 'src/user/gql/user.gql'
import { CreateTaskArgs } from './args/create-task.args'
import { UpdateTaskArgs } from './args/update-task.args'
import { Task } from './gql/task.gql'
import { TaskPermissionInterceptor } from './interceptor/task-permission.interceptor'
import { TaskService } from './task.service'

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => Task, { name: 'task' })
  @Directive('@auth')
  task(@Args({ type: () => String, name: 'id' }) id: string) {
    return this.taskService.findById(new Types.ObjectId(id))
  }

  @Mutation(() => Task, { name: 'createTask' })
  @Directive('@auth')
  createTask(
    @Args() dto: CreateTaskArgs,
    @User() user: Pick<DecodedIdToken, 'uid'>,
  ) {
    return this.taskService.create({
      name: dto.name,
      section: new Types.ObjectId(dto.section),
      due_date: new Date(+dto.dueDate),
      user: user.uid,
      description: dto.description,
    })
  }

  @Mutation(() => Task, { name: 'updateTask' })
  @Directive('@auth')
  @UseInterceptors(TaskPermissionInterceptor)
  updateTask(@Args() dto: UpdateTaskArgs) {
    const { id, ...field } = dto
    const updateField = { ...field, dueDate: new Date(+field.dueDate) }
    return this.taskService.update(
      new Types.ObjectId(id),
      mapKeys(updateField, (_, key) => snakeCase(key)),
    )
  }

  @Mutation(() => Task, {
    name: 'deleteTask',
    description: 'Delete task permanently',
  })
  @Directive('@auth')
  @UseInterceptors(TaskPermissionInterceptor)
  deleteTask(@Args({ name: 'id', type: () => String }) id: string) {
    return this.taskService.delete(new Types.ObjectId(id))
  }

  @ResolveField(() => UserModel)
  async user(@Parent() task: Pick<DocumentType<TaskModel>, 'populate'>) {
    const populatedTask = await task.populate('user')
    return populatedTask.user
  }

  @ResolveField(() => SectionType)
  async section(@Parent() task: Pick<DocumentType<TaskModel>, 'populate'>) {
    const populatedTask = await task.populate('section')
    return populatedTask.section
  }
}
