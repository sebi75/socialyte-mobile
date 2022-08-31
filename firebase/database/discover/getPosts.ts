import { db } from "../../firebaseConfig"
import {
  getDocs,
  query,
  where,
  collection,
  getDoc,
  doc,
  limit,
} from "firebase/firestore"
import { Post } from "../../types"

export const getDiscoverPosts = async (): Promise<Array<Post>> => {
  let posts: Array<Post> = []
  const collectionRef = collection(db, "media")
  const timeNow = Date.now() - 1000 * 3600 * 24 * 7
  const q = query(collectionRef, where("createdAt", ">=", timeNow), limit(7))

  try {
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const post = doc.data()
      post.id = doc.id
      posts.push(post as Post)
    })

    const finalPosts: Array<Post> = []

    for (const post of posts) {
      let postOwner = post.postOwner
      let postOwnerData = await getDoc(doc(db, "users", postOwner))
      let postOwnerDataData = postOwnerData.data()
      post.username = postOwnerDataData?.username
      post.profilePicture = postOwnerDataData?.profilePicture
      finalPosts.push(post)
    }

    return finalPosts
  } catch (error: any) {
    console.log(error)
    throw Error("error in getting the posts from the database", error)
  }
}
