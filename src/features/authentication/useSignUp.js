import { useMutation } from "@tanstack/react-query"
import { SignUp as SignUpApi } from "../../services/authentication/SignUp"

export function useSignUp() {
    const { mutate: SignUp, isLoading } = useMutation({
        mutationFn: SignUpApi
    })

    return { SignUp, isLoading }
}

export default useSignUp
