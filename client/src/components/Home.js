import React from "react";
import { Link } from "react-router-dom";
import library from "../assets/libraryyIcon.jpg";
import editor from "../assets/textEditoIcon.webp";
import trans from "../assets/translateIcon.webp";
import './style.css'

export default function Home() {
  return (
    <div className="home-icons flex mt-4 md:mt-10 flex-col md:flex-row justify-around items-center my-20 container">
        <Link to='/translate'>
      <img
        src={trans}
        alt=""
        className="home-options w-60 lg:w-80 rounded-lg shadow-lg"
      />
      </Link>
      <Link to='/editor'>
      <img
        src={editor}
        alt=""
        className="home-options w-60 lg:w-80 rounded-lg shadow-lg"
      />
      </Link>
      <Link to='/library'>
      <img
        src={library}
        alt=""
        className="home-options w-60 lg:w-80 rounded-lg shadow-lg"
      />
      </Link>
    </div>
  );
}
