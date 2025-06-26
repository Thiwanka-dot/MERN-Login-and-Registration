import { Link, useNavigate } from "react-router"; // Fixed import
import { FaRegUserCircle, FaRegUser } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { useContext } from "react";
import AuthContext from "../../AuthContext/AuthContext";
import Swal from "sweetalert2";

export default function Navbar() {
    const { handleSubmit } = useContext(AuthContext); // Moved to top level
    const navigate = useNavigate(); // Moved to top level

    const handleLogout = async (e) => {
        e.preventDefault();

        const { status, message } = await handleSubmit(`/logout`); // Fixed endpoint

        if (status === 200) {
            Swal.fire({
                title: message,
                icon: "success",
                draggable: true,
            });

            console.log("User logged out: ", status, message);
            navigate("/login");
        } else {
            Swal.fire({
                title: "Error!",
                text: "Logout failed.",
                icon: "error",
            });
        }
    };

    return (
        <nav className="w-full h-20 border-b-[2px] border-[#515def] bg-white">
            <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8">
                {/* Logo Section */}
                <div className="logo">
                    <Link
                        to="/"
                        className="flex items-center gap-3 text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
                    >
                        <FaRegUserCircle color="#515def" size="2rem" /> Auth System
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/login"
                        className="text-lg text-gray-700 font-medium flex items-center gap-2 hover:text-blue-600 transition-colors"
                    >
                        <RiLoginCircleFill size="1.5rem" /> Login
                    </Link>
                    <Link
                        to="/register"
                        className="text-lg text-gray-700 font-medium flex items-center gap-2 hover:text-blue-600 transition-colors"
                    >
                        <RiLoginCircleFill size="1.5rem" /> Register
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="dropdown relative">
                        <div
                            tabIndex={0}
                            role="button"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            <FaRegUser color="#515def" size="1.5rem" />
                        </div>
                        <ul className="dropdown-content absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-48 p-2 z-10">
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-lg text-[#313131] font-medium rounded-box capitalize flex items-center gap-3"
                                >
                                    <IoMdLogOut color="#515def" size="1.5rem" /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}