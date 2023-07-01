import React, { useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import noteContext from '../contexts/notes/noteContext';


const NoteItem = (props) => {
    const { note,updateNote } = props;
    const context = useContext(noteContext);
  const { deleteNote } = context;

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <IconButton aria-label="delete" size="small" onClick={()=>{deleteNote(note._id);
                        props.showAlert("Deleted Successfully","success");

                        }}>
                            <DeleteIcon />
                        </IconButton>  
                        <IconButton aria-label="edit" size="small" onClick={()=>{updateNote(note);    
                        }}>
                            <EditIcon/>    
                        </IconButton>  
       
                    </div>
            </div>
        </div>
    )
}

export default NoteItem