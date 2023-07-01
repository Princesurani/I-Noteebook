import React from 'react'
import { Link, useLocation,useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();    

  let location = useLocation();
  const handlelogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h4 className="nav-brand mx-2" to="">i-Notebook</h4>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

              <li className="mx-3">
                <Link className={`nav-link ${location.pathname === '/home' ? "active" : ""}`} to="home">Home</Link>
              </li>

              <li >
                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ?
              <form className="d-flex">
                <Link className="btn btn-primary mx-2" to="login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="signup" role="button">SignUp</Link>
              </form> :
              <button className="btn btn-primary mx-2" to="signup" onClick={handlelogout} >Logout</button>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar