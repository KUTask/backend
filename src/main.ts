import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import fastifyCookie from '@fastify/cookie'
import { SwaggerBuilder } from './swagger'

async function bootstrap() {
  const port = process.env.PORT ?? 4000
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  })
  new SwaggerBuilder(app).build()
  await app.listen(port, '0.0.0.0')
}
bootstrap()
