import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'
import { DecodedIdToken, getAuth } from 'firebase-admin/auth'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name)

  async use(
    req: FastifyRequest & { user?: DecodedIdToken },
    res: FastifyReply,
    next: () => void,
  ) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      if (token) {
        req.user = await getAuth()
          .verifyIdToken(token, true)
          .then((user) => {
            this.logger.log(`User ${user.uid} ${user.name} authorized`)
            return user
          })
          .catch((e) => {
            this.logger.error('Verify ID token error', e)
            return null
          })
      }
    }
    next()
  }
}
