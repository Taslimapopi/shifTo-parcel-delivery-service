import React from 'react';
import logo from './../../../assets/logo.png';
import ThemeToggle from '../../../components/ThemeToggle';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const NavBar = () => {
  const { user, logOut } = useAuth();

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/services">Services</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/coverage">Coverage</NavLink></li>
    </>
  );

 const getFirstName = (name) => {
    return name ? name.split(' ')[0] : '';
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="navbar bg-primary dark:bg-base-300 shadow-sm border-b border-base-300 sticky top-0 z-50 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 dark:bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
          <img className="h-10 w-10 rounded-full" src={logo} alt="Shifto Logo" />
          <span className="font-semibold">Shifto</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {links}
        </ul>
      </div>

      <div className="navbar-end flex items-center  pr-4">
        <ThemeToggle />

        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10">
              <span className="font-medium text-sm hidden md:block">
                {getFirstName(user.displayName || user.email)}
              </span>
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/30 flex items-center justify-center bg-white/20 text-white font-semibold text-lg">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitial(user.displayName || user.email)
                )}
              </div>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 dark:bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow text-base-content">
              <li><a>Profile</a></li>
              <li><a>Settings</a></li>
              <li>
                <button onClick={logOut} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="button">Log In</Link>
        )}
      </div>
    </div>
  );
};
export default NavBar;