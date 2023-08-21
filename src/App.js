import React from "react";
import SingUp from "./Component/SIngup/SingUp";
import { Route, Routes } from "react-router";
import Home from "./Component/Pages/Home";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<SingUp/>} />
      <Route path="/home" element={<Home/>}  />
    </Routes>
  
    </>
  );
}

export default App;
