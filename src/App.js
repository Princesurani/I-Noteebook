import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Alert from './components/Alert';
import NoteState from './contexts/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';



function App() {
  const [alert,setalert]=useState();
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setalert(null);
    }, '3000')
  }

  return (
    <div className="App">
      <NoteState>
      <BrowserRouter>
      <Navbar />
      <Alert alert={alert}/>
      <div className="container">
        <Routes>
        <Route path="" element={<Home/>} />
          <Route path="home" element={<Home  showAlert={showAlert}/>} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login  showAlert={showAlert}/>} />
          <Route path="signup" element={<Signup showAlert={showAlert}/>} />
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
