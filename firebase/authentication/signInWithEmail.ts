import { auth } from "./"
import { signInWithEmailAndPassword } from "firebase/auth"

interface UserResult {
  uid: string
  email: string
  token: string
}
export type SignInWithEmailResult = UserResult | undefined

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<SignInWithEmailResult> => {
  let returnedUser
  await signInWithEmailAndPassword(auth, email, password)
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
      throw Error(errorCode)
    })

  return returnedUser
}
