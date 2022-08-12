import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaHamburger, FaBackward } from "react-icons/fa";
import { useState } from "react";
import { useRef } from "react";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const menuSet = useRef(null);

  const changeMenu = () => {
    setMenu(!menu);
    menuSet.current.classList.toggle("active");
  };

  return (
    <div className="navbar container flex flex-row justify-between items-center py-3">
      <Link to="/">
        <h1 className="text-2xl md:text-4xl font-Inter font-bold cursor-pointer text-site-blue">
          SoluText
        </h1>
      </Link>
      <div className="menu flex flex-row items-center justify-between">
        <button className="mx-3 btn">Sign In</button>
        <div
          className="menu-items list-none text-md sm:text-lg md:text-xl text-site-black font-Inter"
          ref={menuSet}
        >
          <Link to="/">
            <li className="mx-3 nav-links cursor-pointer hover:text-black">
              Home
            </li>
          </Link>
          <Link to="/editor">
            <li className="mx-3 nav-links cursor-pointer hover:text-black">
              Editor
            </li>
          </Link>
          <Link to="/translate">
            <li className="mx-3 nav-links cursor-pointer hover:text-black">
              Translator
            </li>
          </Link>
          <Link to="/library">
            <li className="mx-3 nav-links cursor-pointer hover:text-black">
              Library
            </li>
          </Link>
          <li className="mx-3 nav-links cursor-pointer hover:text-black">
            Contact Us
          </li>
        </div>
        <div
          className="nav-icon text-2xl text-site-black hover:text-black mx-2"
          onClick={changeMenu}
        >
          {menu ? <FaBackward /> : <FaHamburger />}
        </div>
      </div>
    </div>
  );
}
