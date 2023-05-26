import express from "express";
import * as integranteService from "./integrantes.serv";

export const integrantesController = express.Router();

//Listagem de Integrantes
integrantesController.get("/", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const order_by = req.query.order_by as string | undefined;
  const direction = req.query.direction as string | undefined;
  const search =
    req.query.search !== undefined ? req.query.search.toString() : undefined;
  const integrantes = await integranteService.getIntegrantes({
    limit,
    offset,
    search,
    order_by,
    direction,
  });
  res.status(200).json(integrantes);
});

//Pega Integrante pelo ID
integrantesController.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const integrante = await integranteService.getIntegranteById(id);
  res.status(200).json(integrante);
});

//Adiciona um Integrante
integrantesController.post("/", async (req, res) => {
  const response = await integranteService.addIntegrante(req.body);
  res.status(201).json(response);
});

//Alterar um Integrante
integrantesController.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await integranteService.editarIntegranteById(id, req.body);
  res.status(200).json(response);
});

// Deleta um Integrante pelo ID
integrantesController.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await integranteService.deleteIntegranteById(id);
  res.status(200).json(response);
});
