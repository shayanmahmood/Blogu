import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { updateUser as updateUserApi  } from "../../../services/user/updateUser"

function useUpdateUser() {
    const params = useParams()
    const navigate = useNavigate()
    const { isLoading, mutate: updateUser } = useMutation({
        mutationFn: updateUserApi,
        onSuccess: () => {
            toast('User Successfully Updated',
                {
                    icon: '✨',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
            navigate(`/creators/${params.userid}`, {
                replace: true
            })
        },
        onError: (error) => {
            console.log(error)
            toast.error("User Cannot be Updated")
        }
    })

    return { isLoading, updateUser }
}


export default useUpdateUser
