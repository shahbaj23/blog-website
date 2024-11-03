import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Agriculture", href: "/post/category/Agriculture" },
  { name: "Business", href: "/post/category/Business" },
  { name: "Technology", href: "/post/category/Technology" },
  { name: "Education", href: "/post/category/Education" },
  { name: "Entertainment", href: "/post/category/Entertainment" },
  { name: "Art", href: "/post/category/Art" },
  { name: "Weather", href: "/post/category/Weather" },
  { name: "Sports", href: "/post/category/Sports" },
];

function Footer() {
  return (
    <div className="bg-[#021931e0] py-4">
        {/* desktop menu  */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 text-white text-center py-8">
        <ul className="flex justify-center items-center flex-wrap">
          {categories.map((category, index) => (
            <li
              className="text-sm font-medium hover:text-amber-500 mx-5 bg-slate-500 py-[5px] px-3 rounded-[9px] transition duration-300 my-3"
              key={index}
            >
              <Link to={category.href}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <hr className="bg-white"/>
      <div className="text-center mt-4 text-sm">
        <p className="text-white">All Rights Reserved &copy; Shahbaj Coder</p>
      </div>
    </div>
  );
}

export default Footer;
