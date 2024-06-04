import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddComments } from "../../services/blogs/ApiGetBlog"
import toast from "react-hot-toast"

function useAddComments() {
    const queryClient = useQueryClient()
    const { isLoading, mutate: addComment } = useMutation({

        mutationFn: AddComments,
        onSuccess: () => {
            toast('Comment Successfully Added',
                {
                    icon: '✨',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
            queryClient.invalidateQueries(['blog'])
        },
        onError: (error) => {
            console.log(error)
            toast.error("Comment Cannot be Added")
        }
    })

    return { isLoading, addComment }
}

export default useAddComments
