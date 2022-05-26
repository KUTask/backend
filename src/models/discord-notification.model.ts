import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { SectionModel } from './section.model'

@modelOptions({
  schemaOptions: {
    collection: 'discord_notification_schedules',
  },
})
export class DiscordNotificationSchedulesModel {
  @prop({ auto: true })
  _id: Types.ObjectId

  @prop({ required: true, alias: 'guildId' })
  guild_id: string

  guildId?: string

  @prop({ ref: () => SectionModel })
  section: Ref<SectionModel>

  @prop({ type: Date, default: new Date(), alias: 'createdAt' })
  created_at: Date

  createdAt?: Date
}
