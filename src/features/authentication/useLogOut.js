import { useMutation } from "@tanstack/react-query"
import { LogOut as ApiLogOut } from "../../services/authentication/ApiLogOut"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function useLogOut() {
    const navigate = useNavigate()
    const { isLoading, mutate: LogOut } = useMutation({
        mutationFn: ApiLogOut,
        onSuccess: () => {
            toast('User Successfully Loged Out',
                {
                    icon: '🎉',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
            navigate('/login')
        },
        onError: (error) => {
            console.log(error)
            toast.error("User Cannot be Loged Out")
        }
    })

    return { isLoading, LogOut }
}

export default useLogOut
