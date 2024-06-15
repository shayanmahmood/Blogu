import { db } from "../../firebase.js"
import { collection, getDocs } from "firebase/firestore"

export async function getUsers() {
    let users = []
    const docRef = collection(db, 'users')
    const docsSnap = await getDocs(docRef)

    if (docsSnap) {
        docsSnap.forEach(doc => {
            users.push({ ...doc.data(), id: doc.id })
        })
        return users
    } else {
        return false
    }

}