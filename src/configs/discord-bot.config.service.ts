import {
  DiscordModuleOption,
  DiscordOptionsFactory,
} from '@discord-nestjs/core'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Intents } from 'discord.js'
import { EnviormentVariables } from 'src/configs'

@Injectable()
export class DiscordBotConfigService implements DiscordOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createDiscordOptions(): DiscordModuleOption {
    return {
      token: this.configService.get(EnviormentVariables.DISCORD_BOT_TOKEN),
      discordClientOptions: {
        intents: [Intents.FLAGS.GUILDS],
      },
    }
  }
}
