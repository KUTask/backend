import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GqlConfigService } from './configs/gql.config'

@Module({
  imports: [
    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      useClass: GqlConfigService,
      driver: MercuriusDriver,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
