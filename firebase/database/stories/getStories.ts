import { db } from "../../firebaseConfig"
import { getDocs, collection, where, query } from "firebase/firestore"

import store from "../../../state/store"

import { Story } from "../../types"

type GetStoriesResult = Array<Story>

export const getStories = async (): Promise<GetStoriesResult> => {
  let stories: GetStoriesResult = []

  const userFollowingIds = store.getState().userConnections.followingIds

  const collectionRef = collection(db, "stories")
  const timeNow = Date.now()

  const q = query(
    collectionRef,
    where("createdBy", "in", userFollowingIds),
    where("expiresAt", ">=", timeNow)
  )

  try {
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      //same as the post
      const story = doc.data()
      stories.push(story as Story)
    })
  } catch (error: any) {
    console.log(error)
    throw Error("error in getting the stories from the database", error)
  }

  return stories
}
