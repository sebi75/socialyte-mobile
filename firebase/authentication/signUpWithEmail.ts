import { auth } from "./"

import { createUserWithEmailAndPassword } from "firebase/auth"

interface SignUpWithEmailRessult {}

export const signUpWithEmail = async (email: string, password: string) => {
  let returnedUser
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user
      const tokenPromise = await userCredential.user.getIdTokenResult()
      const token = tokenPromise.token

      returnedUser = {
        uid: user.uid,
        email: user.email,
        token,
      }
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      returnedUser = undefined

      throw Error(error.message)
    })

  return returnedUser
}
