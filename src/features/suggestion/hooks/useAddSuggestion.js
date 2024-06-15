import { useMutation } from "@tanstack/react-query";
import { SetSuggestion } from "../../../services/Suggestions/ApiSuggestions";
import toast from "react-hot-toast";

export function useSetSuggestion() {

    const { mutate: setSuggesion, isLoading } = useMutation({
        mutationFn: SetSuggestion,
        onSuccess: () => {
            toast('Your Suggestion Successfully Uploaded',
                {
                    icon: '✨',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
        },
        onError: (error) => {
            console.log(error)
            toast.error("Suggestion Cannot be Uploaded")
        }
    })

    return { isLoading, setSuggesion }


}