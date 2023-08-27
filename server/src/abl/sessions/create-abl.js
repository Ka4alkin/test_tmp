const User = require('../../models/users-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppHelper = require('../../helpers/app-helper');


const messages = {
  success: {
    login: 'Login successful',
  },
  error: {
    invalidCredentials: 'Invalid credentials',
  },
};
class SessionCreateAbl {
  async createSession(req, res) {
    const {email, password} = req.body;

    const userObject = await User.findOne({where: [{email: email}]});

    if (!userObject || !(await bcrypt.compare(password, userObject.password))) {
      AppHelper.throwError(res, messages.error.invalidCredentials);
    }

    const token = jwt.sign({userId: userObject.id}, process.env.JWT_SECRET, {expiresIn: '3h'});

    res.json({...userObject.dataValues, token});
  }
}

module.exports = new SessionCreateAbl();
