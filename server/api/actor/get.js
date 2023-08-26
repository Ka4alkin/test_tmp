const Actor = require('../../models/actor');

const messages = {
  error: {
    actorNotFound: 'actorNotFound',
  },
};

class GetAbl {
  async get(req, res) {
    const actor = await Actor.findByPk(req.params.id);
    if (!actor) {
      return res.status(404).json({message: messages.error.actorNotFound});
    }
    res.json(actor);
  }
}

module.exports = new GetAbl();
