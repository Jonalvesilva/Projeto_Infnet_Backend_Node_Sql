import express from "express";

export const dependentesController = express.Router();

//Listagem de Dependentes
dependentesController.get("/", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const order_by = req.query.order_by as string | undefined;
  const direction = req.query.direction as string | undefined;
  const search =
    req.query.search !== undefined ? req.query.search.toString() : undefined;
  res.end("passei pelo controller dependentes");
});

//Pega Dependente pelo ID
dependentesController.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
});

//Adiciona um Depedente
dependentesController.post("/", async (req, res) => {});

//Sobrescrever um Depedente
dependentesController.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
});

// Deleta um Dependente pelo ID
dependentesController.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
});
