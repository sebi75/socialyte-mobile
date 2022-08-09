import { collection, getDocs, query, where, limit } from "firebase/firestore"
import store from "../../../state/store"
import { db } from "../../firebaseConfig"

/* TYPES */
import { User, UserFollowArrayType, UserFollowPreviewType } from "../../types"

export type ConnectionsType = "followers" | "following"

export const getConnections = async (
  uid: string,
  type: ConnectionsType
): Promise<UserFollowArrayType> => {
  let usersIds: string[]
  if (type === "followers") {
    if (uid != store.getState().user.uid) {
      usersIds = store.getState().userConnections.temporaryFollowersIds[uid]
    } else {
      usersIds = store.getState().userConnections.followersIds
    }
  } else {
    if (uid != store.getState().user.uid) {
      usersIds = store.getState().userConnections.temporaryFollowingIds[uid]
    } else {
      usersIds = store.getState().userConnections.followingIds
    }
  }

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
    return userFollowersPreview
  }
}

const dataToReturnableUser = (userData: User): UserFollowPreviewType => {
  return {
    uid: userData.uid,
    profilePicture: userData.profilePicture,
    username: userData.username,
    description: userData.description,
  }
}
