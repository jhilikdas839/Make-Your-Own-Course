import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Course from "../pages/Courses";
import Contact from "../pages/Contact";

const Allroutes = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        
        <Route path="/courses" element={<Course />} />

      </Routes>
    </div>
  );
};

export default Allroutes;