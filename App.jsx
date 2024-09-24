import { Toaster } from "react-hot-toast";
import React from "react";
import  Navbarr from "../components/Navbarr";
import Mainpage from "../components/Mainpage";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Errorfound from "../components/Errorfound";
import { Route, Routes } from "react-router-dom";


const App = () => {
  return (

    <div className="image-back">
      <Toaster />

      <Navbarr />

      <Routes>
        <Route path="/" element={<Mainpage />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="*" element={<Errorfound />} />
      </Routes>
    </div>
  );
};

export default App;
