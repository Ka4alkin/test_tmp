const Actor = require('../../models/actor');

const messages = {
  error: {
    actorNotFound: 'actorNotFound',
  },
  success: {
    deletedSuccessfully: 'Actor deleted successfully',
  },
};

class DeleteAbl {
  async delete(req, res) {
    const actor = await Actor.findByPk(req.params.id);
    if (!actor) {
      return res.status(404).json({message: messages.error.actorNotFound});
    }
    await actor.destroy();
    res.json({message: messages.success.deletedSuccessfully});
  }
}

module.exports = new DeleteAbl();
