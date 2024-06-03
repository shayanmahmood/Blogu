import { useQuery } from "@tanstack/react-query"
import { getBlogs } from "../../../services/blogs/ApiGetBlog"

export function useGetBlogs() {

    const { isLoading, data: Blogs } = useQuery({
        queryFn: () => getBlogs(),
        queryKey: ['blogs']
    })

    return { isLoading, Blogs }
}

export default useGetBlogs
