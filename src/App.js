import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import PollCreate from "./pages/PollCreate";
import PollView from "./pages/PollView";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Dash-Board/:uid" element={<DashBoard />} />
          <Route path="/Poll-Create" element={<PollCreate />} />
          <Route path="/Poll-View/:id" element={<PollView />} />
          <Route path="/Login" element={<SignIn />} />
          <Route path="/Register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
