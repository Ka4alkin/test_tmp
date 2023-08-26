const Actor = require('../../models/actor');
const {throwError} = require('../../helpers/app-helper');
const AppHelper = require('../../helpers/app-helper');
const messages = {
  error: {
    actorNotFound: 'actorNotFound',
    actorWithSameNameAndSurnameExist: 'actorWithSameNameAndSurnameExist',
  },
};

class UpdateAbl {
  async update(req, res) {
    AppHelper.isDateExist(req, res);
    const actor = await Actor.findByPk(req.params.id);
    if (!actor) {
      return res.status(404).json({message: messages.error.actorNotFound});
    }

    const {name, surname} = req.body;

    const initials = {};
    if (name && surname) {
      initials.name = name;
      initials.surname = surname;
    } else if (name) {
      initials.name = name;
      initials.surname = actor.dataValues.surname;
    } else if (surname) {
      initials.name = actor.dataValues.name;
      initials.surname = surname;
    }

    const existingActor = await Actor.findOne({where: [{name: initials.name, surname: initials.surname}]});

    if (existingActor) {
      return throwError(res, messages.error.actorWithSameNameAndSurnameExist);
    }

    await actor.update({name, surname});
    res.json(actor);
  }
}

module.exports = new UpdateAbl();
