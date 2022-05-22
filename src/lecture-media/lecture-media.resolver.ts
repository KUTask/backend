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
import { Types } from 'mongoose'
import { LectureMediaModel } from 'src/models/lecture-media.model'
import { SectionLocalSectionType } from 'src/section/gql/section.gql'
import { User } from 'src/user/user.decorator'
import { UserType } from 'src/user/user.model'
import { CreateLectureMediaArgs } from './args/create-lecture-media.args'
import { UpdateLectureMediaArgs } from './args/update-lecture-media'
import { LectureMediaLectureMediaType } from './gql/lecture-media.gql'
import { LectureMediaPermissionInterceptor } from './interceptor/lecture-media-permission.interceptor'
import { LectureMediaService } from './lecture-media.service'

@Resolver(() => LectureMediaLectureMediaType)
export class LectureMediaResolver {
  constructor(private readonly lectureMediaService: LectureMediaService) {}

  @Query(() => [LectureMediaLectureMediaType], {
    name: 'lectureMedialectureMedias',
  })
  @Directive('@auth')
  lectureMedialectureMediasType(
    @Args({
      type: () => String,
      name: 'section',
      nullable: true,
      description: 'section if null return all lecturemedia',
    })
    section?: string,
  ) {
    return this.lectureMediaService.find(
      section ? new Types.ObjectId(section) : null,
    )
  }

  @Query(() => LectureMediaLectureMediaType, {
    name: 'lectureMedialectureMedia',
  })
  lectureMedialectureMediaType(
    @Args({
      type: () => String,
      name: 'id',
    })
    id: string,
  ) {
    return this.lectureMediaService.findById(new Types.ObjectId(id))
  }

  @Mutation(() => LectureMediaLectureMediaType, {
    name: 'lectureMediaCreateLectureMedia',
  })
  @Directive('@auth')
  lectureMediaCreateLectureMedia(
    @Args() args: CreateLectureMediaArgs,
    @User() user: Pick<DecodedIdToken, 'uid'>,
  ) {
    return this.lectureMediaService.create({
      name: args.name,
      link: args.link,
      icon: args.icon,
      description: args.description,
      section: new Types.ObjectId(args.section),
      user: user.uid,
    })
  }

  @Mutation(() => LectureMediaLectureMediaType, {
    name: 'lectureMediaUpdateLectureMedia',
  })
  @Directive('@auth')
  @UseInterceptors(LectureMediaPermissionInterceptor)
  lectureMediaUpdateLectureMedia(@Args() args: UpdateLectureMediaArgs) {
    const { id, ...field } = args

    return this.lectureMediaService.update(new Types.ObjectId(id), field)
  }

  @Mutation(() => LectureMediaLectureMediaType, {
    name: 'lectureMediaDeleteLectureMedia',
    description: 'Delete lectureMedia permanently',
  })
  @Directive('@auth')
  lectureMediaDeleteLectureMedia(
    @Args({ name: 'id', type: () => String }) id: string,
  ) {
    return this.lectureMediaService.delete(new Types.ObjectId(id))
  }

  @ResolveField(() => SectionLocalSectionType)
  async section(@Parent() lectureMedia: DocumentType<LectureMediaModel>) {
    const populatedLectureMedia = await lectureMedia.populate('section')
    return populatedLectureMedia.section
  }

  @ResolveField(() => UserType)
  async user(@Parent() lectureMedia: DocumentType<LectureMediaModel>) {
    const populatedLectureMedia = await lectureMedia.populate('user')
    return populatedLectureMedia.user
  }
}
