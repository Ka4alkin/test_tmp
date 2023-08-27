const bcrypt = require('bcryptjs');
const User = require('../../models/users-model');
const AppHelper = require('../../helpers/app-helper');

const messages = {
  error: {
    createUserFailed: 'create user failed',
    userWithSuchUserNameExist: 'user already exist',
    passwordDontMatch: 'passwordDontMatch',
  },
};
class UserCreateAbl {
  async userCreate(req, res) {
    const {email, name, password, confirmPassword} = req.body;

    const userObject = await User.findOne({where: [{email: email}]});

    if (userObject) AppHelper.throwError(res, messages.error.userWithSuchUserNameExist);


    if (password !== confirmPassword) {
      AppHelper.throwError(res, messages.error.passwordDontMatch);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUserObjectDto = {name, email, password: hashedPassword};
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

module.exports = new UserCreateAbl();
