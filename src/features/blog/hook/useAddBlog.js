import { useMutation } from "@tanstack/react-query"
import { setBlog } from "../../../services/blogs/ApiGetBlog"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function useAddBlog() {
    const navigate = useNavigate()
    const { isLoading, mutate: addBlog } = useMutation({
        mutationFn: setBlog,
        onSuccess: () => {
            toast('Blog Successfully Uploaded',
                {
                    icon: '✨',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
            navigate("/blogs")
        },
        onError: (error) => {
            console.log(error)
            toast.error("Blog Cannot be Uploaded")
        }
    })

    return { isLoading, addBlog }
}


export default useAddBlog
