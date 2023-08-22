import React, { useContext } from "react";
import SingUp from "./Component/SIngup/SingUp";
import { Route, Routes,Navigate } from "react-router-dom";
import Home from "./Component/Pages/Home";
import { AuthoContext } from "./Component/store/AuthoContext";

function App() {
  const ctx = useContext(AuthoContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<SingUp />} />
        {ctx.isLogine && <Route path="/home" element={<Home />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
