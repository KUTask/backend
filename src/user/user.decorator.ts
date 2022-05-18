import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const context = ctx.getArgByIndex(2)
  return context.user
})
