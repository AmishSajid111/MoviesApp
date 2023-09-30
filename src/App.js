import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Singlemovies from "./Components/Singlemovies";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movie/:id" element={<Singlemovies />} />
    </Routes>
  );
};

export default App;
