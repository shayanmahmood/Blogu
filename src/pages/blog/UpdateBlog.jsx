import * as React from "react"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import Button from "../../components/ui/Button";
import "react-quill/dist/quill.snow.css";
import { cn } from "@/lib/utils"
import useGetBlog from "../../features/blog/hook/useGetBlog";
import useUpdateBlog from "../../features/blog/hook/useUpdateBlog";
import Spinner from "../../components/Spinner";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        (<input
            type={type}
            className={cn(
                "bg-slate-800 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props} />)
    );
})
Input.displayName = "Input"


const UpdateBlog = () => {
    const params = useParams()
    const [img, setImg] = useState(null);
    const history = useNavigate();
    const { isLoading, blog } = useGetBlog()
    const { isLoading: isUpdating, updateBlog } = useUpdateBlog()
    const [title, setTitle] = useState(blog?.title);
    const [desc, setDesc] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        updateBlog({ blogid: params.blogid, desc, userId: blog.autherId, userName: blog.author, category: blog.category, img, title, existingImageURL: blog?.image })
    }

    if (blog) {
        if (desc === "") {
            setDesc(blog?.Blog)
        }
    }

    if (isLoading && isUpdating) {
        return <Spinner />
    }

    return (
        <div className="my-24 sm:my-36 flex justify-center">
            {blog && (
                <form onSubmit={handleSubmit} className="w-[85%] xl:w-[50rem] flex flex-col gap-10 items-center">
                    <Input
                        type="text"
                        className="w-full h-12"
                        value={title ? title : blog.title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}

                    />
                    <label htmlFor="img" className="relative">
                        <img
                            src={img ? URL.createObjectURL(img) : blog?.image}
                            alt="blog"
                            className="hover:brightness-50"
                        />
                        <FaRegEdit
                            className="absolute top-5 right-5 text-white text-4xl cursor-pointer"
                            onClick={() => document.getElementById("img").click()}
                        />
                    </label>
                    <input
                        type="file"
                        className="hidden"
                        id="img"
                        onChange={(e) => setImg(e.target.files[0])}
                        accept="image/*"
                    />
                    <div className="w-full">
                        {true && <ReactQuill theme="snow" value={desc ? desc : blog.Bloq} onChange={(content) => {
                            setDesc(content)
                        }} />}
                    </div>
                    <div className="flex gap-5 w-[full]">
                        <Button onClick={() => history(-1)}>Cancel</Button>
                        <Button type="submit">
                            Update
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateBlog;
