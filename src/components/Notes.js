import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../contexts/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import {useNavigate} from "react-router-dom"



const Notes = (props) => {
  const navigate = useNavigate();    

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "default" })


  const handleSubmit = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
    props.showAlert("Note Updated Successfully","success");

  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else
    {
      navigate("/login")
    }
    // eslint-disable-next-line 
  }, [])

  const ref = useRef(null)
  const refclose = useRef(null)

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });

  }

  return (
    <div className='container my-3'>
      <AddNote showAlert={props.showAlert}/>

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3 ">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Update note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <h3>Notes</h3>
        <div className='container'>
          {notes.length === 0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </div>
  )
}

export default Notes