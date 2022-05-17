import { Injectable, NestMiddleware } from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'
import { DecodedIdToken, getAuth } from 'firebase-admin/auth'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(
    req: FastifyRequest & { user?: DecodedIdToken },
    res: FastifyReply,
    next: () => void,
  ) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      if (token) {
        req.user = await getAuth().verifyIdToken(token, true)
      }
    }
    next()
  }
}
