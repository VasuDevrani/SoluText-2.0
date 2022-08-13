import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import { FaTrash, FaPen } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Library() {
  const [isNotes, setIsNotes] = useState(true);

  const [notes, setNotes] = useState([]);
  const [trans, setTrans] = useState([]);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.post("/note/getall", {
        userId: userInfo._id,
      });
      setNotes(data);
      console.log(data);
    };
    const getSecondData = async () => {
      const { data } = await axios.post("/trans/getall", {
        userId: userInfo._id,
      });
      setTrans(data);
    };

    getData();
    getSecondData();
  }, [userInfo._id]);

  async function handleTrashOne(id){
    try {
      await axios.put("/note/delete", { _id: id });

      const { data } = await axios.post("/note/getall", {
        userId: userInfo._id,
      });
      setNotes(data);
    } catch (err) {
      toast.error("Cannot delete");
    }
  };

  async function handleTrashTwo(id){
    try {
      await axios.put("/trans/delete", { _id: id });

      const { data } = await axios.post("/trans/getall", {
        userId: userInfo._id,
      });
      setTrans(data);
    } catch (err) {
      toast.error("Cannot delete");
    }
  };

  return (
    <div className="library container">
      <div
        className={`lib-section text-lg md:text-2xl text-center cursor-pointer text-white bg-site-blue p-2 my-4 border-l-2 hover:bg-site-dark-blue ${
          isNotes ? "scale-y-125 bg-site-dark-blue" : ""
        } duration-200`}
        onClick={() => {
          setIsNotes(true);
        }}
      >
        Notes
      </div>
      <div
        className={`lib-section text-lg md:text-2xl text-center cursor-pointer text-white bg-site-blue p-2 my-4 border-l-2 hover:bg-site-dark-blue ${
          isNotes ? "" : "scale-y-125 bg-site-dark-blue"
        } duration-200`}
        onClick={() => {
          setIsNotes(false);
        }}
      >
        Library
      </div>
      {isNotes ? (
        <div className="notesDisplay grid md:grid-cols-2 grid-cols-1 items-center">
          {notes.length > 0
            ? notes.map((note) => (
                <div
                  className="note-item flex flex-1 bg-green-600 hover:bg-green-800 w-3/4 items-center justify-between m-auto text-white p-3 rounded-2xl my-3 cursor-pointer"
                  key={note._id}
                >
                  <Link to={`/editor/${note._id}`}>
                    <h1 className="text-lg md:text-xl ">{note.title}</h1>
                  </Link>
                  <div className="icon flex flex-row gap-4">
                    <button
                      className="trash"
                      onClick={() => handleTrashOne(note._id)}
                    >
                      <FaTrash />
                    </button>
                    <Link to={`/editor/${note._id}`}>
                      <FaPen />
                    </Link>
                  </div>
                </div>
              ))
            : ""}
        </div>
      ) : (
        <div className="transDisplay grid md:grid-cols-2 grid-cols-1 items-center">
          {trans.length > 0
            ? trans.map((tran) => (
                <div
                  className="note-item flex flex-1 bg-green-600 hover:bg-green-800 w-3/4 items-center justify-between m-auto text-white p-3 rounded-2xl my-3 cursor-pointer"
                  key={tran._id}
                >
                  <Link to={`/editor/${tran._id}`}>
                    <h1 className="text-lg md:text-xl">{tran.title}</h1>
                  </Link>
                  <div className="icon flex flex-row gap-4">
                    <button
                      className="trash"
                      onClick={handleTrashTwo(tran._id)}
                    >
                      <FaTrash />
                    </button>
                    <Link to={`/editor/${tran._id}`}>
                      <FaPen />
                    </Link>
                  </div>
                </div>
              ))
            : ""}
        </div>
      )}
    </div>
  );
}
