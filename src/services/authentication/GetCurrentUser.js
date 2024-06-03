import { getAuth } from "firebase/auth";

export function GetCurrentUser() {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
        return user
    } else {
        return false
    }
}


