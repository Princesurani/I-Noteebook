import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"


const Login = (props) => {

    const navigate = useNavigate();    
    const [details,setDetails]=useState({email:"",password:""});


    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
      }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:details.email,password:details.password}),

          });
          const json=await response.json();
          console.log(json);
          if(json.success)
          {
            //redirect and save authtoken
            localStorage.setItem('token',json.authtoken);
            navigate("/home")
            props.showAlert("Logged in Successfully","success");

          }
          else{
            props.showAlert("Invaid credentials","danger")
          }
    }

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" value={details.email} id="email" name="email" onChange={onChange} required/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" value={details.password} id="password" name="password" onChange={onChange} required/>
                </div>
               
                <button type="submit" class="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login