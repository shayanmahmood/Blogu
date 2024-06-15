import useGetBlogs from "../../features/blog/hook/useGetBlogs";
import Footer from "../../components/Footer";
import BlogsCard from "../../components/ui/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Outlet } from "react-router-dom";


const Home = () => {
    const { isLoading, Blogs } = useGetBlogs()

    if (Outlet) return (
        <div className="flex flex-col items-center justify-center">
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-[0.05]" />
            <div className="absolute size-96 bg-neutral-700 top-0 rounded-full blur-[150px] -z-50" />
            <div className="my-44 sm:my-52 flex flex-col gap-14 items-center justify-center text-center">
                <h1 className="text-5xl py-13 md:w-[75%] md:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-tight px-4 md:px-0">
                    Start Sharing Your Words Now!
                </h1>
                <p className="w-11/12 md:w-[55%] sm:text-xl text-slate-400">
                    Ignite your writing passion. Share your voice with the world on our cutting-edge platform. Join a thriving community of
                    <span className="text-slate-100"> dynamic bloggers today.</span>{" "}
                    Unleash your creativity and join a community of fellow bloggers today.
                </p>
            </div>
            <div className="space-y-10 w-[80%] md:w-[50rem] xl:w-[80rem]" id="blogs">
                <h1 className="text-3xl sm:text-4xl">All LO'res</h1>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center mt-20">
                {isLoading ? (
                    Array.from({ length: 9 }).map((items, index) => {
                        return (
                            <div
                                className="flex flex-col space-y-3 w-[80vw] md:w-[25rem]"
                                key={index}
                            >
                                <Skeleton className="h-[12rem] md:h-[14rem] w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-4/5" />
                                    <div className="flex gap-2">
                                        <Skeleton className="size-10 rounded-full" />
                                        <div className="w-3/5 space-y-2">
                                            <Skeleton className="w-3/5 h-3 " />
                                            <Skeleton className="w-2/5 h-3   " />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : Blogs && Blogs.length > 0 ? (
                    Blogs.map((items) => {
                        return <BlogsCard key={items.id} data={items} />;
                    })
                ) : (
                    <div className="col-span-3 flex justify-center items-center">
                        <h1>Cannot find any blog.</h1>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Home;
