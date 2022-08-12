import React, { useState } from "react";
import "./style.css";

export default function Library() {
  const [isNotes, setIsNotes] = useState(true);

  return (
    <div className="library container">
      <div className="lib-section text-lg md:text-2xl text-center cursor-pointer text-white bg-site-blue p-2 my-4 border-l-2 hover:bg-site-dark-blue" onClick={() => {
    setIsNotes(true)
  }}>
        Notes
      </div>
      <div className="lib-section text-lg md:text-2xl text-center cursor-pointer text-white bg-site-blue p-2 my-4 border-l-2 hover:bg-site-dark-blue" onClick={() => {
    setIsNotes(false)
  }}>
        Library
      </div>
      {isNotes ? (
        <div className="notesDisplay">notes</div>
      ) : (
        <div className="transDisplay">trans</div>
      )}
    </div>
  );
}
