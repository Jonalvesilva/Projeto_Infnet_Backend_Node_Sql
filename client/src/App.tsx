import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Appbar } from "./components/Appbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { IntegrantesView } from "./routes/integrantes/IntegrantesView";
import { IntegranteView } from "./routes/integrantes/IntegranteView";
import { IntegranteEdit } from "./routes/integrantes/IntegranteEdit";
import { CreateIntegrante } from "./routes/integrantes/CreateIntegrante";
import { DependentesView } from "./routes/dependentes/DependentesView";
import { DependenteView } from "./routes/dependentes/DependenteView";
import { DependenteEdit } from "./routes/dependentes/DependenteEdit";
import { CreateDependente } from "./routes/dependentes/CreateDependente";

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
          <Route
            path="/integrantes/addIntegrantes"
            element={<CreateIntegrante />}
          ></Route>
          <Route path="/dependentes/:id" element={<DependentesView />}></Route>
          <Route
            path="/dependentes/:id/:idDep"
            element={<DependenteView />}
          ></Route>
          <Route
            path="/dependentes/:id/:idDep/editar"
            element={<DependenteEdit />}
          ></Route>
          <Route
            path="/dependentes/:id/addDependente"
            element={<CreateDependente />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
