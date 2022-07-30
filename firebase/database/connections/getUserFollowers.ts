import {
  collection,
  doc,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore"
import store from "../../../state/store"
import { db } from "../../firebaseConfig"

/* TYPES */
import { User, UserFollowArrayType, UserFollowPreviewType } from "../../types"

export const getUserFollowers = async (): Promise<UserFollowArrayType> => {
  const usersIds = store.getState().userConnections.followersIds
  if (usersIds.length == 0) {
    return []
  }
  const q = query(
    collection(db, "users"),
    where("uid", "in", usersIds),
    limit(7)
  )
  const querySnapshot = await getDocs(q)

  let userFollowersPreview: UserFollowPreviewType[] = []
  if (querySnapshot.empty) {
    return []
  } else {
    querySnapshot.forEach((doc) => {
      const userData = doc.data()

      const userPreview = dataToReturnableUser(userData as User)
      userFollowersPreview.push(userPreview)
    })
  }
  return userFollowersPreview
}

const dataToReturnableUser = (userData: User): UserFollowPreviewType => {
  return {
    uid: userData.uid,
    profilePicture: userData.profilePicture,
    username: userData.username,
    description: userData.description,
  }
}
