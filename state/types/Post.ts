import { checkPossibleType, checkType } from "../../utils/type-utils"

//
//
/* FILE MAYBE NEEDS REFACTRING AND BETTER LOGIC */
//
//

export interface Post {
  postOwner: string
  username: string
  description: string
  mediaURL: string
  mediaType: string
  createdAt: Object
}

export function isPost(obj: any): obj is Post {
  //this should check for all the must have properties of a post
  const validFields = mustRequiredFields.every((field) => field in obj)
  const validTypes =
    checkPossibleType(obj, "object") &&
    checkType(obj.id, "string") &&
    checkType(obj.createdAt, "object") &&
    checkType(obj.description, "string") &&
    checkType(obj.mediaURL, "string") &&
    checkType(obj.mediaType, "string") &&
    checkType(obj.postOwner, "string") &&
    checkType(obj.username, "string")

  return validFields && validTypes
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

const mustRequiredFields = [
  "description",
  "mediaURL",
  "mediaType",
  "postOwner",
  "createdAt",
  "username",
]

const postFields = [
  "id",
  "createdAt",
  "description",
  "mediaURL",
  "mediaType",
  "postOwner",
  "username",
]
