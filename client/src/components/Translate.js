import React from "react";
import "./style.css";

export default function Translate() {
  return (
    <div className="container trans flex flex-col h-60 my-10">
      <div className=" mx-10 trans-text flex flex-col justify-center items-center p-3">
        <div className="trans-input flex flex-col md:flex-row">
          <textarea
            type="text"
            placeholder="enter text"
            className="input-box mx-3 p-2 border"
          />
          <textarea
            type="text"
            placeholder="translate"
            className="input-box mx-3 p-2 border"
          />
        </div>
        <div className="language flex flex-row justify-around py-3">
          <div className="from-lang mx-5">
            <select name="cars" id="languages">
              <option value="e">English</option>
              <option value="saab">Hindi</option>
              <option value="mercedes">Spanish</option>
              <option value="audi">Chinese</option>
            </select>
          </div>
          <div className="to-lang mx-5">
            <select name="cars" id="languages">
            <option value="e">English</option>
              <option value="saab">Hindi</option>
              <option value="mercedes">Spanish</option>
              <option value="audi">Chinese</option>
            </select>
          </div>
        </div>
        <button className="btn my-3">Translate Text</button>
        <button className="btn">Save</button>
      </div>
    </div>
  );
}
