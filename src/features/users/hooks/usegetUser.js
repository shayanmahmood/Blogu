import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { getUser } from "../../../services/user/getUser"
import { getAuth } from "firebase/auth"

function useGetUser() {
    const auth = getAuth()
    const params = useParams()
    const id = auth.currentUser.uid
    const { isLoading, data: user } = useQuery({
        queryFn: () => getUser(params.userid || id),
        queryKey: ['user'],
        onError: () => {
            toast.error("canot fetch user")
        }
    })

    return { isLoading, user }

}

export default useGetUser
