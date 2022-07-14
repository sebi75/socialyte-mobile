export interface UserState {
  isAuthenticated: boolean
  email: string
  uid: string
  username: string | undefined
  profilePicture: string | undefined
}
