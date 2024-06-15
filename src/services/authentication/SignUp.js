import { db } from '../../firebase.js'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
export async function SignUp({ email, password, firstname, lastname, userName = '', bio = '', image = '' }) {
    const auth = getAuth() //*getting Auth
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

    const user = userCredentials.user //*getting user

    updateProfile(auth.currentUser, { //*adding name of user
        displayName: firstname
    })

    let userDataToUpload = { email, password, firstname, lastname, userName, bio, timeStamp: serverTimestamp() }//* Making User Data to uplaod

    const docRef = doc(db, 'users', user.uid) //* Making refrence to Uplaod
    setDoc(docRef, userDataToUpload) //* Uploading Data
}