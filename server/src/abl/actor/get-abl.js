const Actor = require('../../models/actor-model');

const messages = {
  error: {
    actorNotFound: 'actorNotFound',
  },
};

class GetActorAbl {
  async getActor(req, res) {
    const actorObject = await Actor.findByPk(req.params.id);
    if (!actorObject) {
      return res.status(404).json({message: messages.error.actorNotFound});
    }
    res.json(actorObject);
  }
}

module.exports = new GetActorAbl();
