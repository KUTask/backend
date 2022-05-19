import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class KuAuthArgs {
  @Field()
  username: string

  @Field()
  password: string
}
