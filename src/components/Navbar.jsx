import { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu4Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { GradientButton } from "./ui/GradientButton";

const Navbar = () => {
    const pre = "top-[-22rem] right-[-5rem]";
    const post = "right-[1.5rem] top-20 shadow-xl bg-gray-900";
    const [active, setActive] = useState(pre);
    const menuHandler = () => {
        active === pre ? setActive(post) : setActive(pre);
    };

    const linkStyle = "rounded-xl transition-all";
    return (
        <div className="fixed top-0 sm:top-5 left-0 w-full h-16 flex justify-center items-center z-50">
            <div className="backdrop-blur-lg border-b sm:bg-gradient-to-b from-neutral-900 to-slate-900 sm:border gap-4 flex items-center justify-between sm:justify-normal sm:rounded-full px-6 w-full sm:w-auto h-16 sm:h-14">
                <div className="sm:hidden">
                    <h1>Blogu</h1>
                </div>
                <div
                    className={`absolute rounded-2xl sm:relative ${active} sm:top-0 sm:right-0 sm:shadow-none transition-all duration-300 w-36 sm:w-auto`}
                >
                    <ul className="w-28 text-slate-200 py-5 pl-5 text-sm flex flex-col gap-4 sm:flex-row sm:w-[fit-content] sm:p-0 sm:items-center">
                        <li className={linkStyle}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={linkStyle}>
                            <Link to="/blogs">Blogs</Link >
                        </li>
                        <li className={linkStyle}>
                            <Link to="/users">Creators</Link>
                        </li>
                        <li className={linkStyle}>
                            <Link to="/blogs/create-blog">Create</Link>
                        </li>
                        <li className={linkStyle}>
                            <Link to='/profile'>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to='/signUp'>
                                <GradientButton>
                                    Sign Up
                                </GradientButton>
                            </Link>
                        </li>
                    </ul>
                </div>
                <button
                    className="sm:hidden"
                    onClick={menuHandler}
                    onBlur={menuHandler}
                    aria-label="Navigation Menu"
                >
                    {active === pre ? (
                        <RiMenu4Fill className="text-xl cursor-pointer" />
                    ) : (
                        <MdClose className="text-xl cursor-pointer" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
