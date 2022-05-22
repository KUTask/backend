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
import { SectionSectionType } from 'src/section/gql/section-type.gql'
import { User } from 'src/user/user.decorator'
import { UserType } from 'src/user/user.model'
import { CreateTaskArgs } from './args/create-task.args'
import { UpdateTaskArgs } from './args/update-task.args'
import { TaskTaskType } from './gql/task.gql'
import { PermissionInterceptor } from './interceptor/permission.interceptor'
import { TaskService } from './task.service'

@Resolver(() => TaskTaskType)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => TaskTaskType, { name: 'taskTask' })
  @Directive('@auth')
  task(@Args({ type: () => String, name: 'id' }) id: string) {
    return this.taskService.findById(new Types.ObjectId(id))
  }

  @Mutation(() => TaskTaskType, { name: 'taskCreateTask' })
  @Directive('@auth')
  createTask(
    @Args() dto: CreateTaskArgs,
    @User() user: Pick<DecodedIdToken, 'uid'>,
  ) {
    return this.taskService.create({
      name: dto.name,
      section: new Types.ObjectId(dto.section),
      due_date: new Date(+dto.dueDate),
      tags: dto.tags,
      user: user.uid,
      description: dto.description,
    })
  }

  @Mutation(() => TaskTaskType, { name: 'taskUpdateTask' })
  @Directive('@auth')
  @UseInterceptors(PermissionInterceptor)
  updateTask(@Args() dto: UpdateTaskArgs) {
    const { id, ...field } = dto
    const updateField = { ...field, dueDate: new Date(+field.dueDate) }
    return this.taskService.update(
      new Types.ObjectId(id),
      mapKeys(updateField, (_, key) => snakeCase(key)),
    )
  }

  @Mutation(() => TaskTaskType, {
    name: 'taskDeleteTask',
    description: 'Delete task permanently',
  })
  @Directive('@auth')
  @UseInterceptors(PermissionInterceptor)
  deleteTask(@Args({ name: 'id', type: () => String }) id: string) {
    return this.taskService.delete(new Types.ObjectId(id))
  }

  @ResolveField(() => UserType)
  async user(@Parent() task: Pick<DocumentType<TaskModel>, 'populate'>) {
    const populatedTask = await task.populate('user')
    return populatedTask.user
  }

  @ResolveField(() => SectionSectionType)
  async section(@Parent() task: Pick<DocumentType<TaskModel>, 'populate'>) {
    const populatedTask = await task.populate('section')
    return populatedTask.section
  }
}
