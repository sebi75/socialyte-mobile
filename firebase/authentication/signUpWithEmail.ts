import { auth } from "./"

import { createUserWithEmailAndPassword } from "firebase/auth"

interface UserResult {
  uid: string
  email: string
  token: string
}
export type SignUpWithEmailResult = UserResult | undefined

export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<SignUpWithEmailResult> => {
  let returnedUser
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user
      const tokenPromise = await user.getIdTokenResult()
      const token = tokenPromise.token

      returnedUser = {
        uid: user.uid,
        email: user.email,
        token,
      }
    })
    .catch((error) => {
      const errorCode = error.code
      returnedUser = undefined
      throw new Error(errorCode)
    })

  return returnedUser
}
