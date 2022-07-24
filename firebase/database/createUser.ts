import { db } from "../firebaseConfig"
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
    await setDoc(docRef, {
      uid,
      email,
      username,
      description: "",
      profilePicture: "",
      following: 0,
      followers: 0,
      name: "",
    })
    await setDoc(searchHistoryRef, {
      users: [],
    })

    try {
      await setDoc(connectionsRef, initialConnectionsDocumentState)
    } catch (error) {
      throw new Error("Failed when creating the connections document")
    }
  } catch (error) {
    throw Error(
      "An error occured when creating a new document for new signed up user"
    )
  }
}
