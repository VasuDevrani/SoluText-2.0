import React, { useEffect } from "react";
import "./style.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useContext } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateEditor() {
  const noteId = useParams();
  // console.log(noteId)

  const [title, setTitle] = useState("");
  const [noteData, setNotedata] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.post("/note/getOne", { _id: noteId });

        setNotedata(data);
        setTitle(data.title);
        setEditorState(
          EditorState.createWithContent(convertFromRaw(JSON.parse(data.notes)))
        );
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  const navigate = useNavigate();

  const updateTextDescription = (state) => {
    setEditorState(state);
  };

  useEffect(() => {
    setNotedata({
      ...noteData,
      notes: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    });
  }, [editorState]);

  async function UpdateNote() {
    try {
      console.log(noteData);

      await axios.put("/note/update", noteData);
      toast.success('note successfully edited');

      navigate('/library')
    } catch (err) {
      console.log(err);
    }
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
    setNotedata({
      ...noteData,
      title: e.target.value,
    });
  };

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
        <input
          type="text"
          className="mt-10 mr-4 rounded-md p-4 border-2 shadow-md outline-none"
          placeholder="title here..."
          value={title}
          onChange={handleTitle}
        />
        <button className="btn mt-10" onClick={UpdateNote}>
          Update Note
        </button>
      </div>
    </>
  );
}

export default UpdateEditor;
