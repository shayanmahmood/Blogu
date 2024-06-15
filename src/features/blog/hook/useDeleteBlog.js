import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteBlog as deleteBlogAPi } from "../../../services/blogs/ApiGetBlog"
import { useNavigate } from "react-router-dom"

function useDeleteBlog() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { isLoading, mutate: deleteBlog } = useMutation({

        mutationFn: deleteBlogAPi,
        onSuccess: () => {
            toast('Blog Successfully Deleted',
                {
                    icon: '🧨',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
            queryClient.invalidateQueries(['blog'])
            navigate('/home#blogs')
        },
        onError: (error) => {
            console.log(error)
            toast.error("Blog Cannot be Deleted")
        }
    })

    return { isLoading, deleteBlog }
}

export default useDeleteBlog
