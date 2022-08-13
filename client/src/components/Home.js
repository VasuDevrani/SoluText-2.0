import React, { useContext } from "react";
import { Link } from "react-router-dom";
import library from "../assets/libraryyIcon.jpg";
import editor from "../assets/textEditoIcon.webp";
import trans from "../assets/translateIcon.webp";
import { Store } from "../Store";
import './style.css'

export default function Home() {

  const {state} = useContext(Store);
  const {userInfo} = state;
  
  return (
    <div className="home-icons flex mt-4 md:mt-10 flex-col md:flex-row justify-around items-center my-20 container">
        <Link to='/translate'>
      <img
        src={trans}
        alt=""
        className="home-options w-60 lg:w-80 rounded-lg shadow-lg mt-5 md:mt-0"
      />
      </Link>
      <Link to='/editor'>
      <img
        src={editor}
        alt=""
        className="home-options w-60 lg:w-80 rounded-lg shadow-lg mt-5 md:mt-0"
      />
      </Link>
      <Link to={userInfo ? '/library' : '/auth'}>
      <img
        src={library}
        alt=""
        className="home-options w-60 lg:w-80 rounded-lg shadow-lg mt-5 md:mt-0"
      />
      </Link>
    </div>
  );
}
