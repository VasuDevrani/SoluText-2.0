import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import Axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Translate() {

  const [transState, setTransState] = useState({
    text: "",
    translation: "",
    to: "hi",
    from: "en",
  });

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTransState({ ...transState, [e.target.name]: e.target.value });
  };

  const handleTrans = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", transState.from);
    encodedParams.append("target_language", transState.to);
    encodedParams.append("text", transState.text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "85b4d25647mshd98eb10fd58d6cep1c794cjsn2f3551088db2",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    Axios.request(options)
      .then(function (response) {
        // console.log(response.data.data.translatedText ? response.data.data.translatedText : '');
        setTransState({
          ...transState,
          translation: response.data.data.translatedText ? response.data.data.translatedText : '',
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const saveTrans = async () => {
    if (userInfo === null) {
      toast.error("Please login first");
      navigate("/auth");
      return;
    }

    try {
      const data = {
        userId: userInfo._id,
        oriText: transState.text,
        transText: transState.translation,
        from: transState.from,
        to: transState.to,
      };
      const res = await Axios.post("/trans/add", data);
      // console.log(res);
      toast.success("Translation saved successfully");
      navigate("/library");
    } catch (err) {
      console.log(err);
      toast.error("Please try again, refresh page");
    }
  };

  return (
    <div className="container trans flex flex-col h-60 my-10">
      <div className=" mx-10 trans-text flex flex-col justify-center items-center p-3">
        <div className="trans-input flex flex-col md:flex-row">
          <textarea
            type="text"
            placeholder="enter text"
            name="text"
            className="input-box mx-3 p-2 border"
            value={transState.text}
            onChange={handleChange}
          />
          <textarea
            type="text"
            placeholder="translate"
            name="translation"
            className="input-box mx-3 p-2 border"
            value={transState.translation}
            onChange={handleChange}
          />
        </div>
        <div className="language flex flex-row justify-around py-3">
          <div className="from-lang mx-5">
            <select
              name="from"
              id="languages"
              value={transState.from}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="id">Spanish</option>
              <option value="chi">Chinese</option>
            </select>
          </div>
          <div className="to-lang mx-5">
            <select
              name="to"
              id="languages"
              value={transState.to}
              onChange={handleChange}
            >
              <option value="hi">Hindi</option>
              <option value="en">English</option>
              <option value="id">Spanish</option>
              <option value="chi">Chinese</option>
            </select>
          </div>
        </div>
        <button className="btn my-3" onClick={handleTrans}>
          Translate Text
        </button>
        <button className="btn" onClick={saveTrans}>
          Save
        </button>
      </div>
    </div>
  );
}
