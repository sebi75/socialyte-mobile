import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore"
import store from "../../../state/store"

export const getUserFollowers = async (userId: string) => {
  const usersIds = store.getState().connections.followers
  const userFollowersPreview: UserFollowersPreviewType[] = []
}

type UserFollowersPreviewType =
  | {
      uid: string
      profilePuicture: string
      username: string
      description: string
    }
  | []
