import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import Dashboard from "./components/tools/Dashboard";
import DashboardDemo from "./components/home/DashboardDemo";
import Tools from "./components/tools/Tools";
import Navbar from "./components/misc/Navbar";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard-demo" element={<DashboardDemo/>}/>
        <Route path="/tools" element={<Tools/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;