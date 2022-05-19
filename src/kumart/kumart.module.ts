import { Module } from '@nestjs/common'
import { KumartService } from './kumart.service'
import { KumartResolver } from './kumart.resolver'

@Module({
  providers: [KumartService, KumartResolver],
})
export class KumartModule {}
