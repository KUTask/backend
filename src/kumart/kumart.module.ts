import { Module } from '@nestjs/common'
import { KumartService } from './kumart.service'
import { KumartResolver } from './kumart.resolver'
import { TypegooseModule } from '@hirasawa_au/nestjs-typegoose'
import { SectionModel } from 'src/models/section.model'

@Module({
  providers: [KumartService, KumartResolver],
})
export class KumartModule {}
