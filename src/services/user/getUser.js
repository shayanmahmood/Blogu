import { db } from "../../firebase.js";
import { doc, getDoc } from "firebase/firestore";

export async function getUser(id) {
    const docRef = doc(db, 'users', `${id}`)
    const user = await getDoc(docRef)

    if (user) {
        return { ...user.data(), id: user.id }
    } else {
        throw new Error("Canot fetch the user")
    }
}