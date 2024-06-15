import useGetBlogs from "../../features/blog/hook/useGetBlogs";
import Footer from "../../components/Footer";
import BlogsCard from "../../components/ui/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import SuggestionCard from "../../components/ui/SuggestionCard";
import useGetSuggestions from "../../features/suggestion/hooks/useGetSuggestion";

function AdminSugestion() {
    // const { isLoading, Blogs } = useGetBlogs()
    const {isLoading, Sugestions} = useGetSuggestions()
    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-scroll hide-scrollbar">
            <div className="relative w-full bg-gradient-to-r from-gray-900 to-gray-900 py-24">
                <div className="absolute inset-0 z-[-10] h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-5" />
                <div className="absolute inset-0 z-[-50] h-[24rem] w-[24rem] bg-neutral-700 top-0 rounded-full blur-[150px]" />
                <div className="container mx-auto px-6 sm:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {isLoading ? (
                            Array.from({ length: 9 }).map((_, index) => (
                                <div key={index} className="flex flex-col space-y-3">
                                    <Skeleton className="h-[12rem] md:h-[14rem] rounded-xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-4/5" />
                                        <div className="flex gap-2 items-center">
                                            <Skeleton circle className="h-10 w-10 rounded-full" />
                                            <div className="w-3/5 space-y-2">
                                                <Skeleton className="w-3/5 h-3" />
                                                <Skeleton className="w-2/5 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : Sugestions && Sugestions.length > 0 ? (
                            Sugestions.map((blog) => <SuggestionCard key={blog.id} data={blog} />)
                        ) : (
                            <div className="col-span-3 flex justify-center items-center">
                                <h1>Cannot find any blog.</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSugestion
