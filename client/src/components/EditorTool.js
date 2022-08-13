import React from "react";
import "./style.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useRef } from "react";
import { useContext } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function EditorTool() {
  // sets the intiall state of editor
  const [editorState, setEditorState] = useState(() => //notes to be added
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState('');

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();

  const updateTextDescription = (state) => {
    setEditorState(state);
  };

  async function addNote() {
    if(userInfo === null)
    {
      toast.warning('Please Sign In')
      navigate('/auth');
      return;
    }

    if(title === '')
    {
      toast.warning('Enter the title');
      return;
    }

    try{
      const data = convertToRaw(editorState.getCurrentContent());

      const newNote = {
        userId: userInfo._id,
        title: title,
        notes: JSON.stringify(data)
      }
      const res = await Axios.post('/note/add', newNote);
      toast.success('New note created')
      navigate('/library')

    }catch(err){
      console.log(err);
      toast.error('Cannot add note, refresh the page')
    }
    // console.log(convertFromRaw(data));
  }
  const wrapperStyle = {
    border: "2px solid #969696",
    width: "70vw",
    boxShadow: "10px 10px 3px grey",
  };
  const toolbarStyle = {
    borderBottom: "1px solid grey",
  };
  const editorStyle = {
    height: "50vh",
    padding: "1rem",
  };

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
      <div className="flex flex-row justify-center items-center my-7">
        <input type="text" className= "mt-10 mr-4 rounded-md p-4 border-2 shadow-md outline-none" placeholder="title here..." value={title} onChange={(e) => setTitle(e.target.value)}/>
        <button className="btn mt-10" onClick={addNote}>
          Add as Note
        </button>
      </div>
    </>
  );
}

export default EditorTool;
