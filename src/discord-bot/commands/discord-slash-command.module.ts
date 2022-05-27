import { DiscordModule } from '@discord-nestjs/core'
import { TypegooseModule } from '@hirasawa_au/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { DiscordNotificationSchedulesModel } from 'src/models/discord-notification.model'
import { RegisterNotificationService } from './register-notification.slash.service'

@Module({
  imports: [
    TypegooseModule.forFeature([DiscordNotificationSchedulesModel]),
    DiscordModule.forFeature(),
  ],
  providers: [RegisterNotificationService],
})
export class DiscordSlashCommandModule {}
