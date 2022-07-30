export type ConnectionsUserDocumentType = {
  followers: string[]
  following: string[]
}

export type UserFollowersArrayType = Array<UserFollowersPreviewType> | []

export type UserFollowersPreviewType = {
  uid: string
  profilePicture: string
  username: string
  description: string
}
