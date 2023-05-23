import express, { Request, Response } from "express";
import cors from "cors";
import { integrantesController } from "./integrantes/integrantes.controller";
import { dependentesController } from "./dependentes/dependentes.controller";

const app = express();
const host = "0.0.0.0";
const port = 8080;

app.use(express.static("public"));
app.use(express.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Pass to next layer of middleware
  next();
});

app.use("/integrantes", integrantesController);
app.use("/integrantes/:id/dependentes", dependentesController);

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
