import { db } from "../../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"

interface UserFollowingInterface {
  uid: string
  photoURL: string
  displayName: string
}

interface ConnectionDocumentInterface {
  followers: Array<UserFollowingInterface>
  following: Array<UserFollowingInterface>
}

interface UserDocumentInterface {
  uid: string
  email: string
  profilePicture: string
  username: string
  description: string
  numberOfPosts: number
  fullName: string
}

const initialConnectionsDocumentState: ConnectionDocumentInterface = {
  followers: [],
  following: [],
}

export const createUserDocumentAtSignup = async (
  uid: string,
  email: string,
  username: string
) => {
  const docRef = doc(db, "users", uid)
  const connectionsRef = doc(db, "connections", uid)
  const searchHistoryRef = doc(db, "searchHistory", uid)

  try {
    const injectedUserDocument: UserDocumentInterface = {
      uid,
      email,
      username,
      description: "",
      profilePicture: "",
      numberOfPosts: 0,
      fullName: "",
    }
    await setDoc(docRef, injectedUserDocument)
    await setDoc(searchHistoryRef, {
      users: [],
    })
    await setDoc(connectionsRef, initialConnectionsDocumentState)
  } catch (error) {
    throw Error(
      "An error occured when creating a new document for new signed up user"
    )
  }
}
