const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  // Cria um novo Dev
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, bio, avatar_url } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  },

  /*
  Para atualizar um dev
  async update() {},
  */
 
  // Para deletar um dev
  async destroy(request, response) {
    const { github_username } = request.params;
    
    const dev = await Dev.deleteOne({ github_username });

    if (dev.deletedCount !== 0) {
      return response.json({ status: "Desenvolvedor deletado com sucesso!" });
    } else {
      return response.json({ status: "Erro ao deletar desenvolvedor com sucesso!" });
    }
  }
};
