import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"


const Signup = (props) => {
  const navigate = useNavigate();    

  const [details,setDetails]=useState({name:"",email:"",password:"",confirmpassword:""});


  const onChange = (e) => {
      setDetails({ ...details, [e.target.name]: e.target.value })

      
    }

    const handleSubmit= async (e)=>{
      const {name,email,password}=details;
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name,email,password}),

        });
        const json=await response.json();
        console.log(json);
        if(json.success)
        {
          //redirect and save authtoken
          localStorage.setItem('token',json.authtoken);
          navigate("/home");
          props.showAlert("Signup Successfully","success");
        }
        else{
          props.showAlert("Invaid credentials","danger")
        }
  }

  return (
    <div className='container'>
            <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <div class="mb-3">
            <label for="email" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" onChange={onChange} required minLength={3}/>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" name="email" onChange={onChange} required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control"  id="password" name="password" onChange={onChange} required minLength={4}/>
          </div>
          <div class="mb-3">
            <label for="confirmpassword" class="form-label">COnfirm-Password</label>
            <input type="confirmpassword" class="form-control"  id="confirmpassword" name="confirmpassword" onChange={onChange} required/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup