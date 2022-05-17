import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export class SwaggerBuilder {
  constructor(private readonly app: NestFastifyApplication) {}

  public build() {
    if (this.isDevelopment()) {
      const doc = SwaggerModule.createDocument(this.app, this.options())
      SwaggerModule.setup('api', this.app, doc)
    }
  }

  private options() {
    return new DocumentBuilder()
      .setTitle('KUTask API')
      .setDescription('KUTask API')
      .setVersion('1.0')
      .build()
  }

  private isDevelopment() {
    return process.env.NODE_ENV === 'development'
  }
}
