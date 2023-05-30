import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Appbar } from "./components/Appbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { IntegrantesView } from "./routes/IntegrantesView";
import { IntegranteView } from "./routes/IntegranteView";
import { IntegranteEdit } from "./routes/IntegranteEdit";

function App() {
  return (
    <BrowserRouter>
      <div className="mb-16">
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/integrantes" element={<IntegrantesView />}></Route>
          <Route path="/integrantes/:id" element={<IntegranteView />}></Route>
          <Route
            path="/integrantes/:id/editar"
            element={<IntegranteEdit />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
