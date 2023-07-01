import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialnotes = []
  


  const [notes, setNotes] = useState(initialnotes)

  const getNotes= async()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  }

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title,description,tag}),
    });
    await response.json();
    getNotes();
  }

  const deleteNote = async (id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    await response.json();
    getNotes();
    // console.log(id);
    // const newNotes = notes.filter((note) => { return note._id !== id })
    // setNotes(newNotes);
  }

  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token":  localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title,description,tag}),
    });
    await response.json();
    getNotes();
  }




  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;