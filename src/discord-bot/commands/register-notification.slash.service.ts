import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from '@discord-nestjs/core'
import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable, Logger } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'

import { DiscordNotificationSchedulesModel } from 'src/models/discord-notification.model'
import { TransformPipe } from '@discord-nestjs/common'
import { RegisterNotificationDto } from './dto/register-notification.dto'
import { Types } from 'mongoose'

@Injectable()
@Command({
  name: 'register',
  description: 'Register a section notification [e.g. Task deadline]',
})
@UsePipes(TransformPipe)
export class RegisterNotificationService
  implements DiscordTransformedCommand<RegisterNotificationDto>
{
  private readonly logger = new Logger(RegisterNotificationService.name)

  constructor(
    @InjectModel(DiscordNotificationSchedulesModel)
    private readonly discordNotificationScheduleModel: ReturnModelType<
      typeof DiscordNotificationSchedulesModel
    >,
  ) {}

  async handler(
    @Payload()
    dto: RegisterNotificationDto,
    executionContext: TransformedCommandExecutionContext<any>,
  ): Promise<string> {
    const doc = await this.discordNotificationScheduleModel.create({
      guild_id: executionContext.interaction.guildId,
      section: new Types.ObjectId(dto.sectionId),
    })
    this.logger.log(
      `Registered section ${doc.section} with guild ${doc.guildId}`,
    )
    return `Notification Registered`
  }
}
