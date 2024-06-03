import { useEffect, useState } from "react";
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

const BlogDetails = () => {
    const { isLoading, blog } = useGetBlog()

    const { scrollYProgress } = useScroll();

    return (
        <div className="flex flex-col items-center mt-28">
            <Helmet>
                <title></title>
                <meta
                    name="description"
                    content={blog ? blog.description.substring(0, 200) : "Blog Not Found"}
                />
            </Helmet>
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-1 w-full fixed left-0 right-0 top-0 bg-slate-300 transform origin-left"
            />
            {/* {loadingBlog ? (
        <div className="col-span-3 animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-500" />
      ) : data && !isError ? (
        <div className="w-[85%] md:w-[70%] xl:w-[55%]">
          <div className="flex justify-between">
            <span
              className="flex gap-2 items-center underline underline-offset-4 cursor-pointer w-[fit-content]"
              onClick={() => history(-1)}
            >
              <IoArrowBack />
              Go back
            </span>
            {data.auth && (
              <div className="flex gap-2 text-xl cursor-pointer">
                <AlertButton
                  className="p-0 h-auto"
                  description="This action cannot be undone. This will permanently delete your blog and remove your data from our servers."
                >
                  <MdDelete className="text-xl text-red-500" />
                </AlertButton>
                <FaEdit
                  className="text-green-600"
                  onClick={() => history(`/blogs/${params.blogId}/edit`)}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-10 my-10">
            <h1 className="text-4xl md:text-5xl font-arapey">{data.title}</h1>
            <img src={data.img.url} alt="blog image" />
            <div className="flex justify-between w-full">
              <Link
                to={`/users/${data.author}`}
                className="cursor-pointer hover:underline"
              >
                By {data.author}
              </Link>
              <span>Created on: {data.createdAt.substring(0, 10)}</span>
            </div>
            <article className="prose-neutral prose-lg lg:prose-xl text-gray-300">
              {parse(data.description)}
            </article>
            <div className="space-y-4">
              <form
                action="POST"
                onSubmit={handleComment}
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
                  <GradientButton type="submit" disabled={loading}>
                    Add
                  </GradientButton>
                </div>
              </form>
              {commentData && commentData.length > 0 ? (
                commentData.map((item) => (
                  <div key={item._id} className="text-slate-300">
                    <div className="flex justify-between">
                      <Link
                        to={`/users/${item.username}`}
                        className="hover:underline"
                      >
                        @{item.username}
                      </Link>
                      <div className="flex items-center gap-1 ">
                        <span>{item.createdAt.substring(0, 10)}</span>
                        {item.isUser && (
                          <button
                            disabled={loading}
                            className="disabled:brightness-50"
                          >
                            <MdDelete
                              onClick={() => deleteComment(item._id)}
                              className="cursor-pointer text-red-600"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-100">{item.description}</p>
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
      )} */}
            <Footer />
        </div>
    );
};

export default BlogDetails;