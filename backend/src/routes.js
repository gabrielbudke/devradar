const { Router } = require("express");
const DevController = require("./controllers/DevController");

const routes = Router();

// Query params: request.query
// Route params: request.params
// Body params: request.body

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);

// Exportando o objeto routes.
module.exports = routes;
