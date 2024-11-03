import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import Avatar1 from "../images/mern-blog-assets-main/avatar17.jpg";
import AuthContext from "../Context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const location = useLocation();
  const { currentUser, logout } = useContext(AuthContext);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenus();
  };

  return (
    <nav className="grid items-center w-full h-20 bg-white/50 backdrop-blur-sm sticky top-0 left-0 z-50 shadow-md">
      <div className="flex justify-between items-center w-full px-6 md:px-12 lg:px-[120px]">
        {/* Logo */}
        <h1 className="text-5xl font-bold italic">
          <Link
            to={location.pathname === "/home" ? "#" : "/home"}
            onClick={closeMenus}
          >
            B<span className="text-amber-700">W</span>
          </Link>
        </h1>

        {/* Desktop Navigation Menu */}
        <ul className="hidden md:flex justify-center items-center space-x-10 text-[17px] font-medium">
          <li>
            <Link
              to={location.pathname === "/home" ? "#" : "/home"}
              className="hover:text-amber-500 transition"
              onClick={closeMenus}
            >
              Home
            </Link>
          </li>
          {currentUser && <li>
            <Link
              to="/create-post"
              className="hover:text-amber-500 transition"
              onClick={closeMenus}
            >
              Create Post
            </Link>
          </li>}
          <li>
            <Link
              to="/author"
              className="hover:text-amber-500 transition"
              onClick={closeMenus}
            >
              Authors
            </Link>
          </li>
          <li>
            {/* Conditionally Render Profile or Register based on currentUser */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center hover:text-amber-500 transition"
                >
                  <img
                    className="w-[40px] h-[40px] rounded-full border border-gray-500"
                    src={Avatar1}
                    alt="User Avatar"
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48 py-2">
                    <Link
                      to={`/profile/${currentUser.id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={closeMenus}
                    >
                      View Profile
                    </Link>
                    <Link
                      to={`/dashboard/${currentUser.id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={closeMenus}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/register"
                className="hover:text-amber-500 transition"
                onClick={closeMenus}
              >
                Register
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white/80 backdrop-blur-sm w-full flex flex-col items-center text-center shadow-md absolute top-20 left-0 z-50">
          <li className="py-3 w-full border-b border-gray-300">
            <Link
              to={location.pathname === "/home" ? "#" : "/home"}
              className="hover:text-amber-600 transition"
              onClick={closeMenus}
            >
              Home
            </Link>
          </li>
          <li className="py-3 w-full border-b border-gray-300">
            <Link
              to="/create-post"
              className="hover:text-amber-600 transition"
              onClick={closeMenus}
            >
              Create Post
            </Link>
          </li>
          <li className="py-3 w-full border-b border-gray-300">
            <Link
              to="/author"
              className="hover:text-amber-600 transition"
              onClick={closeMenus}
            >
              Authors
            </Link>
          </li>
          <li className="py-3 w-full border-b border-gray-300">
            {currentUser ? (
              <Link
                to="/profile"
                className="hover:text-amber-600 transition"
                onClick={closeMenus}
              >
                <FaUserCircle size={28} className="inline mr-2" />
                Profile
              </Link>
            ) : (
              <Link
                to="/register"
                className="hover:text-amber-600 transition"
                onClick={closeMenus}
              >
                Register
              </Link>
            )}
          </li>

          {currentUser && (
            <li className="py-3 w-full">
              <button
                onClick={handleLogout}
                className="hover:text-amber-600 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
