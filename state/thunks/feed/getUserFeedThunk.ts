import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUserFeed } from "../../../firebase/database/feed"

import { Post } from "../../../firebase/types"

import { db } from "../../../firebase/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"

export const getUserFeedThunk = createAsyncThunk(
  "userFeed/getUserFeed",
  async (uid: string, thunkAPI): Promise<Array<Post> | []> => {
    try {
      const response = await getUserFeed(uid)
      let returnArray: any = []

      let uniqueUids: Array<string> = []
      let uids = response.map((post: Post) => post.postOwner)
      uids.forEach((uid: string) => {
        if (!uniqueUids.includes(uid)) {
          uniqueUids.push(uid)
        }
      })

      for (uid of uniqueUids) {
        const userDocument = await getDoc(doc(db, "users", uid))
        const userData = userDocument.data()

        const currentUsersPosts = response.filter(
          (post: Post) => post.postOwner === uid
        )

        currentUsersPosts.map((post: Post) => {
          returnArray.push({
            ...post,
            profilePicture: userData?.profilePicture,
            username: userData?.username,
          } as Post)
        })
      }

      return returnArray as Post[]
    } catch (error: any) {
      console.log(error.code)
      throw new Error("Error in getting user feed")
    }
  }
)
