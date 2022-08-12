import React from "react";
import "./style.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useRef } from "react";

function EditorTool() {
  // sets the intiall state of editor
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const model = useRef(null);
  const updateTextDescription = (state) => {
    setEditorState(state);
  };
  

  function sendData() {
    const data = convertToRaw(editorState.getCurrentContent());
    console.log(JSON.stringify(data));
    console.log("cghanged to");
    console.log(convertFromRaw(data));
  }
  const wrapperStyle = {
    border: "2px solid #969696",
    boxShadow: "10px 10px 3px grey"
  };
  const toolbarStyle = {
    borderBottom: '1px solid grey'
  }
  const editorStyle = {
    height: "50vh",
    padding: "1rem",
  };

  const showEditorModel = () => {
    model.current.classList.toggle('active')
  }

  return (
    <>
      <div className="editor container my-10 flex flex-col items-center">
        <Editor
          editorState={editorState}
          wrapperStyle={wrapperStyle}
          editorStyle={editorStyle}
          toolbarStyle={toolbarStyle}
          onEditorStateChange={updateTextDescription}
        />
      </div>
      <div className="editor-button flex flex-row justify-center items-center my-7 container">
        <input type="text" className="bg-black"/>
        <button className="btn mt-10" onClick={showEditorModel}>
          Submit
        </button> 
      </div>
    </>
  );
}

export default EditorTool;
