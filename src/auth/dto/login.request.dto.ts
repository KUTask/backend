import { ApiProperty } from '@nestjs/swagger'

export class LoginRequestDto {
  @ApiProperty({ description: "Firebase user's uid" })
  id: string

  @ApiProperty({ description: 'Display name' })
  displayName: string

  @ApiProperty({ description: 'Profile picture url' })
  profilePictureUrl: string

  @ApiProperty({ description: 'E-mail' })
  email: string

  @ApiProperty({ description: 'Permanent Login [14days]', default: false })
  permanentLogin = false
}
