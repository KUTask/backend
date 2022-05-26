import { DiscordModule } from '@discord-nestjs/core'
import { Module } from '@nestjs/common'
import { DiscordGatewayService } from './discord-gateway.service'

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [DiscordGatewayService],
})
export class DiscordBotModule {}
