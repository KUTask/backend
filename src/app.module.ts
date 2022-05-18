import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GqlConfigService } from './configs/gql.config'
import { HealthModule } from './health/health.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './configs'
import { TypegooseModule } from '@hirasawa_au/nestjs-typegoose'
import { TypegooseConfig } from './configs/typegoose.config'
import { AuthMiddleware } from './auth/auth.middleware'

@Module({
  imports: [
    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      useClass: GqlConfigService,
      driver: MercuriusDriver,
    }),
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypegooseModule.forRootAsync({
      useClass: TypegooseConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '(.*)',
      method: RequestMethod.ALL,
    })
  }
}
