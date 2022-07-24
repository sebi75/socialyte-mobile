import { db } from "../../firebaseConfig"
import { getDocs, collection, where, query, limit } from "firebase/firestore"
import { User } from "../../types/User"

type GetUsersResult = Array<User>

//this function creates the post in the state
export const getUsersSearch = async (
  searchTerm: string
): Promise<GetUsersResult> => {
  searchTerm = searchTerm.toLowerCase()
  const strlength = searchTerm.length
  const strFrontCode = searchTerm.slice(0, strlength - 1)
  const strEndCode = searchTerm.slice(strlength - 1, searchTerm.length)
  const endCode =
    strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1)

  let users: Array<User> = []
  const collectionRef = collection(db, "users")
  const q = query(
    collectionRef,
    where("username", ">=", searchTerm),
    where("username", "<", endCode),
    limit(5)
  )

  try {
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      //same as the post
      const userId = doc.id
      const user = doc.data()
      user.uid = userId
      users.push(user as User)
    })
  } catch (error: any) {
    console.log(error.message)
    throw Error("Could not get users")
  }

  console.log(users)
  return users
}
