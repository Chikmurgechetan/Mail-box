import React, { useContext } from "react";
import SingUp from "./Component/SIngup/SingUp";
import { Route, Routes, Navigate } from "react-router-dom"; // Fixed typo here
import Home from "./Component/Pages/Home";
import { AuthoContext } from "./Component/store/AuthoContext";
import Header from "./Component/Pages/Header";
import Inbox from "./Component/Pages/Inbox/Inbox";
import ReadMail from "./Component/Pages/Inbox/ReadMail";

function App() {
  const ctx = useContext(AuthoContext);
  
  return (
    <> 
      <Header/>
        <Routes>
        <Route path="/" element={<SingUp />} />
        {ctx.isLogine && <Route path="/home" element={<Home />} />}
        {ctx.isLogine && <Route path="/Inbox" element={<Inbox/>} />}
        {!ctx.isLogine && <Route path="*" element={<Navigate to="/" replace />} />}
        {ctx.isLogine && <Route path="/read/:id" element={<ReadMail/>} />}
        </Routes>
      
    </>
  );
}

export default App;
