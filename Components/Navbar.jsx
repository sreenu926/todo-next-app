// import React from "react";

// const Navbar = () => {
//   return (
//     <div className="flex py-3 flex-wrap justify-around">
//       <h1 className="text-lg font-semibold">Todo App</h1>
//       <ul className="flex gap-[40px] text-m">
//         <li>Home</li>
//         <li>Products</li>
//         <li>About</li>
//         <li>Contact</li>
//       </ul>
//     </div>
//   );
// };

// export default Navbar;

"use client";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Importing icons for hamburger menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-semibold">Todo App</h1>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX
              className="text-2xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FiMenu
              className="text-2xl cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:gap-6 absolute md:static top-16 left-0 w-full bg-gray-800 md:w-auto md:bg-transparent p-4 md:p-0 transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="py-2 md:py-0 hover:text-gray-300 cursor-pointer">
            Home
          </li>
          <li className="py-2 md:py-0 hover:text-gray-300 cursor-pointer">
            Products
          </li>
          <li className="py-2 md:py-0 hover:text-gray-300 cursor-pointer">
            About
          </li>
          <li className="py-2 md:py-0 hover:text-gray-300 cursor-pointer">
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
