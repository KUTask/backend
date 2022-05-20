import { TypegooseModule } from '@hirasawa_au/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { SectionModel } from 'src/models/section.model'
import { UserModule } from 'src/user/user.module'
import { SectionService } from './section.service'
import { SectionResolver } from './section.resolver'

@Module({
  imports: [UserModule, TypegooseModule.forFeature([SectionModel])],
  providers: [SectionService, SectionResolver],
})
export class SectionModule {}
