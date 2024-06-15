import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { getBlogsByUserId } from "../../../services/blogs/ApiGetBlog"

function useGetBlogsByUserId() {

    const params = useParams()

    const { isLoading, data: blogs } = useQuery({
        queryFn: () => getBlogsByUserId(params.userid),
        queryKey: ['userBlogs'],
        onError: () => {
            toast.error("canot fetch blog")
        }
    })

    return { isLoading, blogs }

}

export default useGetBlogsByUserId
