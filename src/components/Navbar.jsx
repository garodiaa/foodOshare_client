import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { FiMenu } from 'react-icons/fi';
import { AuthContext } from '../providers/AuthProvider';
import userDefaultAvatar from '../assets/default-avatar.jpg';


const Navbar = () => {

    const { user, loading, logOutUser } = useContext(AuthContext);

    const handleLogout = () => {
        logOutUser()
            .then(() => {
                toast.success("Logged out successfully");
                // alert('Logged out successfully');
            })
            .catch((error) => {
                toast.error("Failed to log out");
                // console.error('Error logging out:', error);
            });
    };



    const items = (
        <>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/available-foods"}>Available Foods</NavLink>
            </li>
            <li>
                <NavLink to={"/add-food"}>Add Food</NavLink>
            </li>
            <li>
                <NavLink to={`/manage-foods/${user?.email}`}>Manage Food</NavLink>
            </li>
            <li>
                <NavLink to={`/my-food-requests/${user?.email}`}>My Food Requests</NavLink>
            </li>
        </>);

    return (
        <div className="sticky top-2 z-50 navbar container mx-auto  px-4 glass rounded-3xl">
            <div className="navbar-start space-x-2">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="lg:hidden">
                        <FiMenu size={20} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {items}
                    </ul>
                </div>
                <img className="w-6" src="/logo.png" alt="logo" />
                <Link to={"/"} className="font-bold text-lg sm:text-xl">
                    FoodOShare
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{items}</ul>
            </div>

            <div className="navbar-end space-x-2 sm:space-x-4">

                {loading ? (
                    <span className="loading loading-ring loading-xl"></span>
                ) : user ? (
                    <div className="flex items-center gap-2">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="avatar">
                                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer">
                                    <img
                                        className="select-none"
                                        src={user?.photoURL || "/default-avatar.jpg"}
                                        alt="profile"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = "/default-avatar.jpg";
                                        }}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
                            >
                                <li className="mb-2 text-center font-semibold select-none">
                                    {user?.displayName || "User"}
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-error btn-sm w-full"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to={"/auth/login"} className="btn btn-sm sm:btn-md">
                            Login
                        </Link>
                        <Link to={"/auth/register"} className="btn btn-sm sm:btn-md">
                            Register
                        </Link>
                    </>
                )}
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Navbar;