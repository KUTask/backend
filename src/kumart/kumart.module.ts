import { Module } from '@nestjs/common'
import { KumartService } from './kumart.service'
import { KumartResolver } from './kumart.resolver'
import { TypegooseModule } from '@hirasawa_au/nestjs-typegoose'
import { SectionModel } from 'src/models/section.model'
import { SubjectModel } from 'src/models/subject.model'
import { SectionTypeModel } from 'src/models/section-type.model'

@Module({
  imports: [
    TypegooseModule.forFeature([SectionModel, SubjectModel, SectionTypeModel]),
  ],
  providers: [KumartService, KumartResolver],
})
export class KumartModule {}
