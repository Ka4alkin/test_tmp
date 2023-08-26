const User = require('../../models/user');
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
class LoginAbl {
  async login(req, res) {
    const {username, password} = req.body;

    const user = await User.findOne({where: [{username: username}]});

    if (!user || !(await bcrypt.compare(password, user.password))) {
      AppHelper.throwError(res, messages.error.invalidCredentials);
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1m'});

    res.json({message: messages.success.login, token});
  }
}

module.exports = new LoginAbl();
