import { useQuery } from "@tanstack/react-query"
import { getBlog } from "../../../services/blogs/ApiGetBlog"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

function useGetBlog() {

    const params = useParams()

    const { isLoading, data: blog } = useQuery({
        queryFn: () => getBlog(params.blogid),
        queryKey: ['blog'],
        onError: () => {
            toast.error("canot fetch blog")
        }
    })

    return { isLoading, blog }

}

export default useGetBlog
