import { Comment } from "./Comment"

export interface Post {
  postOwner: string
  username: string
  postDescription: string
  profilePicture: string
  mediaURL: string
  mediaType: string
  createdAt: Object
  postId: string
  likes?: string[]
  numOfLikes: number
  numOfComments: number
  comments?: Comment[]
}
