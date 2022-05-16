import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import fastifyCookie from '@fastify/cookie'

async function bootstrap() {
  const port = process.env.PORT ?? 4000
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  await app.register(fastifyCookie)
  await app.listen(port, '0.0.0.0')
}
bootstrap()
