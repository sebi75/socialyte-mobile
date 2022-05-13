import { auth } from "./"

import { createUserWithEmailAndPassword } from "firebase/auth"

interface SignUpWithEmailRessult {}

export const signUpWithEmail = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user

      console.log(user)

      return user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message

      throw Error(error.message)
    })
}
