const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

// Query params: request.query
// Route params: request.params
// Body params: request.body

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.delete("/devs/:github_username", DevController.destroy),
  routes.get("/search", SearchController.index);

// Exportando o objeto routes.
module.exports = routes;
