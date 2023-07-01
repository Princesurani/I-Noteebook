import React, { useContext, useState } from 'react'
import noteContext from '../contexts/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleSubmit=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        props.showAlert("Note Added Successfully","success");

        setNote({title:"",description:"",tag:""})
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <div>
                <h3>Add notes</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description}  onChange={onChange} minLength={5} required  />
                    </div>
                    <div className="mb-3 ">
                    <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag}  onChange={onChange}  />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
                </form>
            </div>


        </div>
    )
}

export default AddNote