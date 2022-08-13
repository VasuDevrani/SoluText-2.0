import React from "react";
import "./style.css";
import userImg from "../assets/user.webp";
import { useState } from "react";
import { useContext } from "react";
import { Store } from "../Store";
import Axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [user, setUser] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  // reducer stuff
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const SignUp = async (e) => {
    e.preventDefault();
    if (
      userData.firstName.length === 0 ||
      userData.lastName.length === 0 ||
      userData.email.length === 0 ||
      userData.password.length === 0
    ) {
      toast.warning("Fill all the details");
      return;
    }
    // console.log(userData);
    try {
      const { data } = await Axios.post("https://solutext.herokuapp.com/user/register", userData);

      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userinfo", JSON.stringify(data));

      reset();
      toast.success("User registered, Welcome!!");
      navigate("/");
    } catch (err) {
      toast.error("User already registered");
      reset();
    }
  };

  const SignIn = async (e) => {
    e.preventDefault();

    const preUser = {
      email: userData.email,
      password: userData.password,
    };
    // console.log(preUser)

    try {
      const { data } = await Axios.post("https://solutext.herokuapp.com/user/login", preUser);
      ctxDispatch({ type: "USER_SIGNIN", payload: data});
      localStorage.setItem("userinfo", JSON.stringify(data));

      toast.success("Successfully logged in, welcome!!");
      navigate("/");
    } catch (err) {
      toast.error("No such user exist");
    }
  };

  return (
    <div className="auth container flex flex-col md:flex-row justify-center items-center font-Inter mt-10 mb-10">
      <img src={userImg} alt="user Icon" className="w-1/3 md:w-1/3 mb-5" />
      <form
        className="authForm flex flex-col items-start justify-around border mx-10 p-5 rounded-lg"
        onSubmit={user ? SignIn : SignUp}
      >
        <h1 className="text-xl md:text-2xl font-semibold my-2">
          {user ? "Sign In" : "Sign Up"}
        </h1>
        {user ? (
          ""
        ) : (
          <>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              className="outline-none border shadow-md my-2 mb-5 p-2"
              value={userData.firstName}
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="outline-none border shadow-md my-2 mb-5 p-2"
              value={userData.lastName}
              onChange={handleChange}
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className="outline-none border shadow-md my-2 mb-5 p-2"
          value={userData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="outline-none border shadow-md my-2 mb-5 p-2"
          value={userData.password}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          {user ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="my-2 text-lg cursor-pointer text-site-blue hover:text-site-dark-blue"
          onClick={() => setUser(!user)}
        >
          {user ? "Create an account" : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  );
}
