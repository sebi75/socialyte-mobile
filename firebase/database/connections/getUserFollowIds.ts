import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"

export const getUserFollowIds = async (
  userId: string
): Promise<GetUserFollowIdsResult> => {
  const docRef = doc(db, "connections", userId)
  try {
    const response = await getDoc(docRef)
    const documentResponseData = response.data()
    if (documentResponseData) {
      const returnData = {
        uid: userId,
        following: documentResponseData.following,
        followers: documentResponseData.followers,
        numberOfFollowers: documentResponseData.numberOfFollowers,
        numberOfFollowings: documentResponseData.numberOfFollowings,
      }
      return returnData
    }
  } catch (error: any) {
    console.log(error)
    throw new Error(`Error in getting the users connection ids`)
  }
  return {
    following: [],
    followers: [],
    numberOfFollowers: 0,
    numberOfFollowings: 0,
    uid: userId,
  }
}

export interface GetUserFollowIdsResult {
  following: string[]
  followers: string[]
  numberOfFollowers: number
  numberOfFollowings: number
  uid: string
}
