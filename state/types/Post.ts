import { checkPossibleType, checkType } from "../../utils/type-utils"

export interface Post {
  id: string
  postOwner: string
  username: string
  description: string
  mediaURL: string
  mediaType: string
  createdAt: Object
}

export function isPost(obj: any): obj is Post {
  return (
    checkPossibleType(obj, "object") &&
    checkType(obj.id, "string") &&
    checkType(obj.createdAt, "object") &&
    checkType(obj.description, "string") &&
    checkType(obj.mediaURL, "string") &&
    checkType(obj.mediaType, "string") &&
    checkType(obj.postOwner, "string") &&
    checkType(obj.username, "string")
  )
}

export function isPartialPost(obj: any): obj is Partial<Post> {
  const fieldsValid = Object.keys(obj).every((p) => postFields.includes(p))
  const hasCorrectType =
    checkPossibleType(obj, "object") &&
    checkPossibleType(obj.id, "string") &&
    checkPossibleType(obj.createdAt, "object") &&
    checkPossibleType(obj.description, "string") &&
    checkPossibleType(obj.mediaURL, "string") &&
    checkPossibleType(obj.mediaType, "string") &&
    checkPossibleType(obj.postOwner, "string") &&
    checkPossibleType(obj.username, "string")

  return fieldsValid && hasCorrectType
}

const postFields = [
  "id",
  "createdAt",
  "description",
  "mediaURL",
  "mediaType",
  "postOwner",
  "username",
]
