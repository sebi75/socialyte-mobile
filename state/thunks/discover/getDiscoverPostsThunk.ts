import { getDiscoverPosts } from "../../../firebase/database/discover/getPosts"

import { createAsyncThunk } from "@reduxjs/toolkit"

import { Post } from "../../../firebase/types"

export const getDiscoverPostsThunk = createAsyncThunk(
  "discoverPosts/getDiscoverPostsThunk",
  async (_, thunkAPI: any): Promise<Post[] | []> => {
    try {
      const posts = await getDiscoverPosts()

      if (posts.length == 0) {
        return []
      }
      return posts
    } catch (error: any) {
      console.log(error)
      throw new Error("Error in getting the posts from the database")
    }
  }
)
