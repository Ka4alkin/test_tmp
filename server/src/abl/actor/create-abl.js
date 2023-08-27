const Actor = require('../../models/actor-model');
const {throwError} = require('../../helpers/app-helper');
const messages = {
  error: {
    actorWithSameNameAndSurnameExist: 'actorWithSameNameAndSurnameExist',
  },
};

class CreateAbl {
  async create(req, res) {
    const {name, surname} = req.body;

    const existingActorObject = await Actor.findOne({where: [{name, surname}]});

    if (existingActorObject) {
      return throwError(res, messages.error.actorWithSameNameAndSurnameExist);
    }

    const newActor = await Actor.create({name, surname});
    res.status(201).json(newActor);
  }
}

module.exports = new CreateAbl();
