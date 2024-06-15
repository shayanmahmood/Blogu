import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { updateBlog as updateBlogApi } from "../../../services/blogs/ApiGetBlog"

function useUpdateBlog() {
    const params = useParams()
    const navigate = useNavigate()
    const { isLoading, mutate: updateBlog } = useMutation({
        mutationFn: updateBlogApi,
        onSuccess: () => {
            toast('Blog Successfully Updated',
                {
                    icon: '✨',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
            navigate(`/blog/${params.blogid}`, {
                replace: true
            })
        },
        onError: (error) => {
            console.log(error)
            toast.error("Blog Cannot be Updated")
        }
    })

    return { isLoading, updateBlog }
}


export default useUpdateBlog
