import { Param } from '@discord-nestjs/core'

export class RegisterNotificationDto {
  @Param({ description: 'section id from kutask' })
  sectionId: string
}
