import express from "express";
import * as dependentesService from "./dependentes.serv";

export const dependentesController = express.Router();

//Listagem de Dependentes
dependentesController.get("/:idIntegrante", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const order_by = req.query.order_by as string | undefined;
  const direction = req.query.direction as string | undefined;
  const search =
    req.query.search !== undefined ? req.query.search.toString() : undefined;

  const response = await dependentesService.getDepedentes(
    {
      limit,
      offset,
      search,
      order_by,
      direction,
    },
    +req.params.idIntegrante
  );
  res.status(200).json(response);
});

//Pega Dependente pelo ID
dependentesController.get("/:idIntegrante/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await dependentesService.getDepedenteById(id);
  return res.status(200).json(response);
});

//Adiciona um Depedente
dependentesController.post("/:idIntegrante", async (req, res) => {
  const id = Number(req.params.idIntegrante);
  const response = await dependentesService.addDependente(id, req.body);
  return res.status(200).json(response);
});

//Sobrescrever um Depedente
dependentesController.put("/:idIntegrante/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await dependentesService.editDependenteById(id, req.body);
  return res.status(200).json(response);
});

// Deleta um Dependente pelo ID
dependentesController.delete("/:idIntegrante/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await dependentesService.deleteDependenteById(id);
  return res.status(200).json(response);
});
