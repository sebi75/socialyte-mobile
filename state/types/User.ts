export interface UserState {
  isAuthenticated: boolean
  email: string | undefined
  uid: string | undefined
  username: string | undefined
  description: string | undefined
  profilePicture: string | undefined
  isUpdatingLoading: boolean
}
