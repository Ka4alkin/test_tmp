const Actor = require('../../models/actor-model');

const messages = {
  error: {
    actorNotFound: 'actorNotFound',
  },
  success: {
    deletedSuccessfully: 'Actor deleted successfully',
  },
};

class DeleteActorAbl {
  async deleteActor(req, res) {
    const actorObject = await Actor.findByPk(req.params.id);
    if (!actorObject) {
      return res.status(404).json({message: messages.error.actorNotFound});
    }
    await actorObject.destroy();
    res.json({message: messages.success.deletedSuccessfully});
  }
}

module.exports = new DeleteActorAbl();
