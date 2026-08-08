import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-bold text-black font-inter">
          Make <span className="italic text-primary">Your Own</span>  Course
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-inter">

          <NavLink className={({isActive})=>`text-black  font-bold ${isActive ?"text-primary":""}` } to="/" >Home</NavLink>

          <a href="#" className="text-black hover:text-primary">
            Courses
          </a>

    
          <a href="#" className="text-black hover:text-primary">
            Contact
          </a>
        </div>

        {/* Login / Signup */}
        <div className="hidden md:flex items-center gap-3 font-inter">
          <button className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary transition">
            <Link to='/login'>Login</Link>
          </button>

          <button className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary transition">
            <Link to='/signup'>Signup</Link>
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-sec"
        >
          <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5 font-inter">

          <div className="flex flex-col gap-4 border-t pt-4">

            <NavLink className="text-black" to="/" >Home</NavLink>

           

            <a href="#" className="text-black">
              Courses
            </a>

            <a href="#" className="text-black">
              Contact
            </a>

            <div className="flex gap-3 pt-2">
              <button className="px-5 py-2 bg-primary text-white rounded-lg">
               <Link className="font-inter" to='/login'>Login</Link>
              </button>

              <button className="px-5 py-2 bg-primary text-white rounded-lg">
                <Link className="font-inter" to='/signup'>Signup</Link>
              </button>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;