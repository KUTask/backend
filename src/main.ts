import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import fastifyCookie from '@fastify/cookie'
import { SwaggerBuilder } from './swagger'
import { initializeApp } from 'firebase-admin/app'
import { credential } from 'firebase-admin'
import { join } from 'path'

async function bootstrap() {
  const port = process.env.PORT ?? 4000
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  initializeApp({
    credential: credential.cert(join(process.cwd(), 'firebase.json')),
  })

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  })
  new SwaggerBuilder(app).build()
  await app.listen(port, '0.0.0.0')
}
bootstrap()
