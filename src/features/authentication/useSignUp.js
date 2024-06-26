import { useMutation } from "@tanstack/react-query"
import { SignUp as SignUpApi } from "../../services/authentication/SignUp"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export function useSignUp() {
    const navigate = useNavigate()
    
    const { mutate: SignUp, isLoading } = useMutation({
        mutationFn: SignUpApi,
        onSuccess: () => {
            toast('User Successfully Registered',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
            navigate('/home')
        },
        onError: (error) => {
            console.log(error)
            toast.error("SomeThing Went Wrong!")
        }
    })

    return { SignUp, isLoading }
}

export default useSignUp
