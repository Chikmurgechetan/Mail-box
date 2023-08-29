import React, { useContext } from "react";
import SingUp from "./Component/SIngup/SingUp";
import { Route, Routes, Navigate } from "react-router-dom"; // Fixed typo here
import Home from "./Component/Pages/Home";
import { AuthoContext } from "./Component/store/AuthoContext";
import Header from "./Component/Header/Header";
import Inbox from "./Component/Pages/Inbox/Inbox";
import ReadMail from "./Component/Pages/Inbox/ReadMail";
import SentMail from "./Component/Pages/Sent/SentMail";
import { ToastContainer } from "react-toastify";
import SentMailRead from "./Component/Pages/Sent/SentReadMail";
import ForgotPassword from "./Component/SIngup/ForgotPassword";

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
        {ctx.isLogine && <Route path="/Sent" element={<SentMail/>} />}
        {ctx.isLogine && <Route path="/SentRead/:id" element={<SentMailRead/>}/>}
         <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>

        <ToastContainer/>
      
    </>
  );
}

export default App;
