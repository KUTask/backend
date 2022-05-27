import { InjectDiscordClient, Once } from '@discord-nestjs/core'
import { Injectable, Logger } from '@nestjs/common'
import { Client } from 'discord.js'

@Injectable()
export class DiscordGatewayService {
  private readonly logger = new Logger(DiscordGatewayService.name)

  constructor(@InjectDiscordClient() private readonly discordClient: Client) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.discordClient.user.tag} was started`)
  }
}
