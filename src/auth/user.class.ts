import { UserPayload } from './user.payload'

export class User implements UserPayload {
  id: string

  displayName: string

  profilePictureUrl: string

  email: string

  isSignedIn() {
    return !!this.id
  }
}
