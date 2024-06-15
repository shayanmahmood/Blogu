import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment as deleteCommentApi } from "../../../../services/blogs/ApiGetBlog"
import toast from "react-hot-toast"

function useDeleteComments() {
    const queryClient = useQueryClient()
    const { isLoading, mutate: deleteComment } = useMutation({

        mutationFn: deleteCommentApi,
        onSuccess: () => {
            toast('Comment Successfully Deleted',
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
            toast.error("Comment Cannot be Deleted")
        }
    })

    return { isLoading, deleteComment }
}

export default useDeleteComments
