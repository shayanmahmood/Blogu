import { Link, Outlet } from "react-router-dom"
import { HiOutlineUsers } from "react-icons/hi2";
import { BsClipboardCheck } from "react-icons/bs";
import { BsPen } from "react-icons/bs";
import { FiBarChart2 } from "react-icons/fi";

function AdminLayout() {
    return (
        <>
            <div className="h-screen w-screen flex bg-gray-900 text-white overflow-hidden">
                <aside className="flex flex-col items-center bg-gray-800 text-gray-300 shadow h-full">

                    <ul>
                        <li className="hover:bg-gray-700">
                            <a
                                href="/home"
                                className="h-16 px-6 flex justify-center items-center w-full
                        focus:text-orange-500">
                                <FiBarChart2 size={22} />
                            </a>
                        </li>
                    </ul>

                    <div className="h-16 flex items-center w-full">
                        <a className="h-10 w-10 mx-auto" href="/home">
                            <img
                                className="h-6 w-6 mx-auto"
                                src="../../../public/logo.png"

                                alt="svelte logo" />
                        </a>
                    </div>

                    <ul>
                        <li className="hover:bg-gray-700">
                            <Link
                                to="/admin"
                                className="h-16 px-6 flex justify-center items-center w-full
                        focus:text-orange-500">
                                <HiOutlineUsers size={22} />

                            </Link>
                        </li>

                        <li className="hover:bg-gray-700">
                            <Link
                                to="/admin/suggestion"
                                className="h-16 px-6  flex justify-center items-center w-full
                            focus:text-orange-500">
                                <BsClipboardCheck size={22} />
                            </Link>
                        </li>
                    </ul>
                </aside>
                <Outlet />
            </div>
        </>
    )
}

export default AdminLayout
