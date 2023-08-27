const Actor = require('../../models/actor-model');
const {throwError} = require('../../helpers/app-helper');
const AppHelper = require('../../helpers/app-helper');
const messages = {
  error: {
    actorNotFound: 'actorNotFound',
    actorWithSameNameAndSurnameExist: 'actorWithSameNameAndSurnameExist',
  },
};

class UpdateActorAbl {
  async updateActor(req, res) {
    AppHelper.isDateExist(req, res);
    const actorObject = await Actor.findByPk(req.params.id);
    if (!actorObject) {
      return res.status(404).json({message: messages.error.actorNotFound});
    }

    const {name, surname} = req.body;

    const initials = {};
    if (name && surname) {
      initials.name = name;
      initials.surname = surname;
    } else if (name) {
      initials.name = name;
      initials.surname = actorObject.dataValues.surname;
    } else if (surname) {
      initials.name = actorObject.dataValues.name;
      initials.surname = surname;
    }

    const existingActor = await Actor.findOne({where: [{name: initials.name, surname: initials.surname}]});

    if (existingActor) {
      return throwError(res, messages.error.actorWithSameNameAndSurnameExist);
    }

    await actorObject.update({name, surname});
    res.json(actorObject);
  }
}

module.exports = new UpdateActorAbl();
