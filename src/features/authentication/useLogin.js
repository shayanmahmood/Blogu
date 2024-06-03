import { useMutation } from "@tanstack/react-query";
import { Login as LoginApi } from "../../services/authentication/Login";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate()
    const { mutate: Login, isLoading, data: user } = useMutation({
        mutationFn: LoginApi,
        mutationKey: ['user'],
        onSuccess: () => {
            toast('User Successfully Loged In',
                {
                    icon: '🎉',
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
            toast.error("User Cannot be Loged In")
        }
    })

    return { Login, isLoading, user }
}