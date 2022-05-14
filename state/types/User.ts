export interface UserState {
  isAuthenticated: boolean
  isLoading: boolean
  profilePicture: string | undefined
  username?: string | undefined
  error: string | undefined
  email: string | undefined
  uid: string | undefined
}
