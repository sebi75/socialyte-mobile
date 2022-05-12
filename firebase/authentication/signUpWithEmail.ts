import { auth } from "./"

import { createUserWithEmailAndPassword } from "firebase/auth"

export const signUpWithEmail = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user
    }
  )
}
