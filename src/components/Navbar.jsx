import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 relative   text-white">
      <div className=" flex justify-between items-center px-4 py-5 h-14 my-container">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">  &lt;</span>
          Pass
          <span className="text-green-500">op/ &gt;</span>
          </div>
        <ul>
          <li className="flex gap-4">
            <a href="#" className="hover:font-bold">
              Home
            </a>
            <a href="#" className="hover:font-bold">
              About
            </a>
            <a href="#" className="hover:font-bold">
              Contact
            </a>
          </li>
        </ul>
        <div>
          <img className="invert absolute right-5  top-0" src="icons/git.svg" alt="git logo" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
