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
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const port = process.env.PORT ?? 4000
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  initializeApp({
    credential: credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  })

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  })

  app.useGlobalPipes(new ValidationPipe())
  new SwaggerBuilder(app).build()
  await app.listen(port, '0.0.0.0')
}
bootstrap()
