import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function Login({ email, password }) {

    const auth = getAuth() //*getting Auth

    const userCredentials = await signInWithEmailAndPassword(auth, email, password)

    return userCredentials?.user //* getting User Data

}