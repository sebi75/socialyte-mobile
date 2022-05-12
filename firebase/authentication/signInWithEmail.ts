import { auth } from "./"
import { signInWithEmailAndPassword } from "firebase/auth"

export const signInWithEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user
    }
  )
}
