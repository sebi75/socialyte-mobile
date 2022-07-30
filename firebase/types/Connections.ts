export type ConnectionsUserDocumentType = {
  followers: string[]
  following: string[]
}

export type UserFollowArrayType = Array<UserFollowPreviewType> | []

export type UserFollowPreviewType = {
  uid: string
  profilePicture: string
  username: string
  description: string
}
