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
import {
  User,
  UserFollowersArrayType,
  UserFollowersPreviewType,
} from "../../types"

export const getUserFollowers = async (
  userId: string
): Promise<UserFollowersArrayType> => {
  const usersIds = store.getState().connections.followers
  if (usersIds.length == 0) {
    return []
  }
  const q = query(
    collection(db, "users"),
    where("uid", "in", usersIds),
    limit(7)
  )
  const querySnapshot = await getDocs(q)

  let userFollowersPreview: UserFollowersPreviewType[] = []
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

const dataToReturnableUser = (userData: User): UserFollowersPreviewType => {
  return {
    uid: userData.uid,
    profilePicture: userData.profilePicture,
    username: userData.username,
    description: userData.description,
  }
}
