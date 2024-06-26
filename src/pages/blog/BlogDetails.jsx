import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Footer from "../../components/Footer";
import { motion, useScroll } from "framer-motion";
import { GradientButton } from "@/components/ui/GradientButton";
import { Helmet } from "react-helmet";
import AlertButton from "@/components/ui/AlertButton";
import useGetBlog from "../../features/blog/hook/useGetBlog";
import { getAuth } from "firebase/auth";
import useAddComments from "../../features/blog/hook/comments/useAddComments";
import useDeleteComments from "../../features/blog/hook/comments/useDeleteComment";
import useDeleteBlog from "../../features/blog/hook/useDeleteBlog";
import Spinner from "../../components/Spinner";


const BlogDetails = () => {
  const [comment, setComment] = useState("");
  const { isLoading, blog } = useGetBlog()
  const auth = getAuth()
  const history = useNavigate()
  const params = useParams()
  const { isLoading: isCommiting, addComment } = useAddComments()
  const { isLoading: isDeleting, deleteComment } = useDeleteComments()
  const { isLoading: isDeletingBlog, deleteBlog: deleteBlogi } = useDeleteBlog()
  const { scrollYProgress } = useScroll();

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

  function addComments() {
    const data = {
      blogId: params.blogid,
      userId: auth.currentUser.uid,
      name: auth.currentUser.displayName,
      comment,
    }
    addComment(data)
  }

  function deleteComments(commentId) {
    deleteComment({
      blogid: params.blogid,
      commentId: commentId
    })
  }

  function deleteBlog() {
    const id = params.blogid
    deleteBlogi(id)
  }


  const created = giveMeDate(blog?.created_at?.seconds)

  if(isDeletingBlog){
    return <Spinner />
  }
  return (
    <div className="flex flex-col items-center mt-28">
      <Helmet>
        <title>{blog?.title}</title>
        <meta
          name="description"
          content={blog ? blog?.description?.substring(0, 200) : "Blog Not Found"}
        />
      </Helmet>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="h-1 w-full fixed left-0 right-0 top-0 bg-slate-300 transform origin-left"
      />
      {isLoading ? (
        <div className="col-span-3 animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-500" />
      ) : blog ? (
        <div className="w-[85%] md:w-[70%] xl:w-[55%]">
          <div className="flex justify-between">
            <span
              className="flex gap-2 items-center underline underline-offset-4 cursor-pointer w-[fit-content]"
              onClick={() => history(-1)}
            >
              <IoArrowBack />
              Go back
            </span>
            {blog?.autherId === auth.currentUser.uid && (
              <div className="flex gap-2 text-xl cursor-pointer items-baseline">
                <AlertButton
                  className="p-0 h-auto"
                  description="This action cannot be undone. This will permanently delete your blog and remove your blog from our servers.">
                  <MdDelete className="text-xl text-red-500" onClick={deleteBlog} />
                </AlertButton>
                <FaEdit
                  className="text-green-600"
                  onClick={() => history(`/blog/${params.blogid}/edit`)}
                />
              </div>
            )}

          </div>
          <div className="flex flex-col gap-10 my-10">
            <h1 className="text-4xl md:text-5xl font-arapey">{blog.title}</h1>
            <img src={blog.image} style={{ width: 'auto', maxHeight: '720px' }} alt="blog" />
            <div className="flex justify-between w-full">
              <Link
                to={`/users/${blog.author}`}
                className="cursor-pointer hover:underline"
              >
                By @{blog.author}
              </Link>


              <span>Created on: {blog && created} </span>


            </div>
            <article className="prose-neutral prose-lg lg:prose-xl text-gray-300">
              {parse(blog.Blog)}
            </article>
            <div className="space-y-4">
              <div
                className="flex relative"
              >
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b h-10 px-2 focus:outline-0"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="absolute right-0">
                  <GradientButton onClick={addComments} disabled={isCommiting || isDeleting}>
                    Add
                  </GradientButton>
                </div>
              </div>
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((item) => (
                  <div key={item.id} className="text-slate-300">
                    <div className="flex justify-between">
                      <Link
                        to={`/users/${item.author}`}
                        className="hover:underline"
                      >
                        @{item.author}
                      </Link>
                      <div className="flex items-center gap-1 ">
                        {/* <span>{item.createdAt.substring(0, 10)}</span> */}
                        <span>{giveMeDate(item.created_at.seconds, true)}</span>
                        {item.userId === auth.currentUser.uid && (
                          <button
                            disabled={isCommiting || isDeleting}
                            className="disabled:brightness-50"
                          >
                            <MdDelete
                              className="cursor-pointer text-red-600"
                              onClick={() => deleteComments(item.id)}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-100">{item.comment}</p>
                  </div>
                ))
              ) : (
                <h1>There are currently no comments on this blog post.</h1>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-xl">Blog not found.</h1>
      )}
      <Footer />
    </div>
  );
};

export default BlogDetails;
