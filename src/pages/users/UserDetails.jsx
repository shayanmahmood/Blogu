import { Link, useNavigate, useParams } from "react-router-dom";
import BlogsCard from "../../components/ui/BlogCard";
import { FaRegEdit } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GradientButton } from "@/components/ui/GradientButton";
import Button from "@/components/ui/Button";
import useGetUser from "../../features/users/hooks/usegetUser";
import { getAuth } from "firebase/auth";
import useGetBlogsByUserId from "../../features/blog/hook/useGetBlogByUserId";

const UserDetails = () => {
    const params = useParams();
    const auth = getAuth()
    const redirect = useNavigate();
    const { isLoading, user } = useGetUser()
    const { isLoading: isBloging, blogs } = useGetBlogsByUserId()



    function giveMeDate(timestamp, isMore) {
        // Assuming you have seconds stored in a variable named 'seconds'
        var seconds = timestamp;

        // Create a JavaScript Date object using seconds
        var date = new Date(seconds * 1000); // Convert seconds to milliseconds

        // Now you can use 'date' variable to get various date components
        // For example:
        var year = date.getFullYear();
        var month = date.getMonth() + 1; // Months are zero-based
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        // You can also format the date as a string in your preferred format
        var formattedDate = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        let newDate = ''
        if (isMore) {
            newDate = month + '/' + day + "/" + year + " " + hours + ':' + minutes + ':' + seconds;
        } else {
            newDate = formattedDate.substring(0, 8)
        }
        return newDate
    }

    return isLoading ? (
        <div className="flex justify-center mt-36">
            <div className="col-span-3 animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-500" />
        </div>
    ) : (
        <div className="flex items-center justify-center my-24 sm:my-36">
            {user ? (
                <div className="w-[fit-content] flex flex-col gap-10 items-center">
                    <div className="flex px-5 sm:px-0 sm:items-start gap-5 sm:gap-14">
                        <img
                            src={user.image || `../public/user.jpeg`}
                            alt="Profile pic"
                            className="size-32 rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-2 sm:flex-row sm:gap-10">
                            <div className="space-y-1 sm:space-y-1">
                                <h1 className="text-xl font-[500]">@{user.firstname}</h1>
                                <h2 className="flex items-center gap-2 text-sm text-slate-400">
                                    <FaRegCalendarAlt />
                                    Date joined: {giveMeDate(user.timeStamp?.seconds)}
                                </h2>
                                <div>
                                    <h3 className="font-[500]">{`${user.firstname}`}</h3>
                                    <p>{user.bio}</p>
                                </div>
                            </div>
                            <div>
                                {user.id === auth.currentUser.uid && (
                                    <GradientButton
                                        onClick={() => redirect(`/creators/${user.id}/edit`)}
                                    >
                                        <span className="flex items-center gap-2">
                                            <FaRegEdit /> Edit
                                        </span>
                                    </GradientButton>
                                )}
                            </div>
                        </div>
                    </div>
                    <hr className="w-full border-zinc-600" />
                    <div
                        className={`flex justify-${user.id === auth.currentUser.uid ? "between" : "center"
                            } w-4/5 md:w-full`}
                    >
                        <h1 className="text-3xl font-[500]">Blogs</h1>
                        {user.id === auth.currentUser.uid && (
                            <Button variant="outline" className='mx-4' >
                                <Link to="/blog/create-blog">New Blog</Link>
                            </Button>
                        )}
                    </div>
                    {blogs  ? (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-8">
                            {blogs.map((items) => {
                                return <BlogsCard key={items.id} data={items} />;
                            })}
                        </div>
                    ) : (
                        <h1>
                            {user.id === auth.currentUser.uid
                                ? "It seems that you haven't created any blogs yet."
                                : "It seems the user hasn't created any blogs yet."}
                        </h1>
                    )}
                </div>
            ) : (
                <div>User Not Found.</div>
            )}
        </div>
    );
};


export default UserDetails;
