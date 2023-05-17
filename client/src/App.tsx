import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Appbar } from "./components/Appbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { TabelaIntegrantes } from "./components/TabelaIntegrantes";

function App() {
  return (
    <BrowserRouter>
      <div className="mb-16">
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/integrantes" element={<TabelaIntegrantes />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
