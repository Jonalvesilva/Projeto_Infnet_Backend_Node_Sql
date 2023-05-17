import express from "express";

export const integrantesController = express.Router();

//Listagem de Integrantes
integrantesController.get("/", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const order_by = req.query.order_by as string | undefined;
  const direction = req.query.direction as string | undefined;
  const search =
    req.query.search !== undefined ? req.query.search.toString() : undefined;
  res.end("passei pelo controller");
});

//Pega Integrante pelo ID
integrantesController.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
});

//Adiciona um Integrante
integrantesController.post("/", async (req, res) => {});

//Sobrescrever um Integrante
integrantesController.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
});

// Deleta um Integrante pelo ID
integrantesController.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
});
