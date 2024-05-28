import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./login";
import Signup from "./signup";
import Home from './home'
import Intro from "./intro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
