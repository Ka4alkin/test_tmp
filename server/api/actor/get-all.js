const Actor = require('../../models/actor');

class GetAllAbl {
  async getAll(req, res) {
    const actors = await Actor.findAll();
    res.json(actors);
  }
}

module.exports = new GetAllAbl();
