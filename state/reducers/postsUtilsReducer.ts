import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { Comment, LikePreview } from "../../firebase/types"

/* THUNKS */
import { getCommentsThunk } from "../thunks/posts/getCommentsThunk"
import { addCommentThunk } from "../thunks/posts/addCommentThunk"
import { likePostOperationThunk } from "../thunks/posts/likePostThunk"
import { getLikesPreviewsThunk } from "../thunks/posts/getLikesPreviewsThunk"

import { uuidv } from "../../utils/uuidv"

export interface UserFeedState {
  comments: { [key: string]: Comment[] } // and the key should be postIds
  likesPreviews: { [key: string]: LikePreview[] } // and the key should be postIds
  isLikesPreviewsLoading: boolean
  isLoading: boolean
  addingError: null | string
  gettingError: null | string
  likesPreviewError: null | string
  addingLoading: boolean
}

const initialState: UserFeedState = {
  comments: {},
  likesPreviews: {},
  isLikesPreviewsLoading: false,
  isLoading: false,
  addingLoading: false,
  addingError: null,
  gettingError: null,
  likesPreviewError: null,
}

export const postsUtilsSlice = createSlice({
  name: "postsUtils",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    /* setLikePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const likePreviewObject = {

      }

    }, */
    setAddcomment: (
      state,
      action: PayloadAction<{ comment: string; postId: string; uid: string }>
    ) => {
      state.comments[action.payload.postId] = [
        ...state.comments[action.payload.postId],
        {
          comment: action.payload.comment,
          createdAt: Date.now(),
          commentId: uuidv(),
          uid: action.payload.uid,
        },
      ]
    },
    clearpostUtilsSliceState: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCommentsThunk.fulfilled,
      (
        state,
        action: PayloadAction<{ postId: string; comments: Comment[] }>
      ) => {
        state.isLoading = false
        const postId = action.payload.postId
        state.comments[postId] = action.payload.comments
      }
    )
    builder.addCase(getCommentsThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCommentsThunk.rejected, (state, action) => {
      state.isLoading = false
      state.gettingError = action.error.message as null | string
    })

    builder.addCase(addCommentThunk.pending, (state) => {
      state.addingLoading = true
    })
    builder.addCase(addCommentThunk.fulfilled, (state) => {
      state.addingLoading = false
    })
    builder.addCase(addCommentThunk.rejected, (state, action) => {
      state.addingLoading = false
      state.addingError = action.error.message as null | string
    })

    builder.addCase(likePostOperationThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(likePostOperationThunk.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(likePostOperationThunk.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getLikesPreviewsThunk.pending, (state) => {
      state.isLikesPreviewsLoading = true
    })
    builder.addCase(getLikesPreviewsThunk.rejected, (state, action) => {
      state.isLikesPreviewsLoading = false
      state.likesPreviewError = action.error.message as null | string
    })
    builder.addCase(
      getLikesPreviewsThunk.fulfilled,
      (
        state,
        action: PayloadAction<{ postId: string; likesPreviews: LikePreview[] }>
      ) => {
        let postId = action.payload.postId
        state.isLikesPreviewsLoading = false
        state.likesPreviews[postId] = action.payload.likesPreviews
      }
    )
  },
})

export const { setIsLoading, setAddcomment, clearpostUtilsSliceState } =
  postsUtilsSlice.actions
export default postsUtilsSlice.reducer
