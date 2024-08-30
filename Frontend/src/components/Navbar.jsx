import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector(state => state.user);

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <>
      <nav className="navbar fixed top-0 left-0 w-full bg-white z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <img src="../../public/logo.png" alt="logo" className="h-8 w-8 mr-2" />
            <h4 className="text-xl font-bold text-yellow-500">NichNest</h4>
          </div>
          <div className="lg:hidden z-50">
            {show ? (
              <AiOutlineClose
                className="text-3xl cursor-pointer"
                onClick={handleToggle}
              />
            ) : (
              <GiHamburgerMenu
                className="text-3xl cursor-pointer"
                onClick={handleToggle}
              />
            )}
          </div>
          <ul className="hidden lg:flex space-x-6">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/jobs"}>Jobs</Link></li>
            {isAuthenticated ? (
              <li><Link to={"/dashboard"}>Dashboard</Link></li>
            ) : (
              <li><Link to={"/login"}>Login</Link></li>
            )}
          </ul>
        </div>
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-transform duration-300 ${
            show ? 'translate-x-0' : '-translate-x-full'
          } lg:hidden`}
        >
          <div className="bg-white w-64 h-full p-4 z-50 relative">
            <ul className="flex flex-col space-y-4">
              <li><Link to={"/"} onClick={handleToggle}>Home</Link></li>
              <li><Link to={"/jobs"} onClick={handleToggle}>Jobs</Link></li>
              {isAuthenticated ? (
                <li><Link to={"/dashboard"} onClick={handleToggle}>Dashboard</Link></li>
              ) : (
                <li><Link to={"/login"} onClick={handleToggle}>Login</Link></li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
