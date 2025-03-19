import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center px-4 md:px-16 py-5">
        <h2 className="text-xl font-medium">Todo App</h2>
        <ul className="list-none flex gap-4 items-center text-xs text-gray-600">
          <a href="">Home</a>
          <a href="">Products</a>
          <a href="">About</a>
          <a href="">Contact</a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
