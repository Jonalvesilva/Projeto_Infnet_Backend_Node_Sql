import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Appbar } from "./components/Appbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
