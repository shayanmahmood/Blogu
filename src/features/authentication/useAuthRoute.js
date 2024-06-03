import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

export function useAuthRoute() {
    const [isLogin, setisLogin] = useState(false)
    const [isLoading, setisLoading] = useState(true)

    const auth = getAuth()

    useEffect(function () {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setisLogin(true)
            }
            setisLoading(false)
        })

    }, [setisLogin, setisLoading, auth])

    return { isLogin, isLoading }

}