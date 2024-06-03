import { getAuth } from "firebase/auth";

export function LogOut() {
    const auth = getAuth()
    auth.signOut()
}