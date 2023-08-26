const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const AppHelper = require('../../helpers/app-helper');

const messages = {
  error: {
    createUserFailed: 'create user failed',
    userWithSuchUserNameExist: 'user already exist',
  },
};
class SignupAbl {
  async signup(req, res) {
    const {username, password} = req.body;

    const user = await User.findOne({where: {username: username}});

    if (user) AppHelper.throwError(res, messages.error.userWithSuchUserNameExist);

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUserObjectDto = {username, password: hashedPassword};
    let newUserObject;

    try {
      newUserObject = await User.create(newUserObjectDto);
    } catch (err) {
      AppHelper.throwError(res, messages.error.createUserFailed, err);
    }

    const dtoOut = {...newUserObject.dataValues};

    res.status(201).json(dtoOut);
  }
}

module.exports = new SignupAbl();
