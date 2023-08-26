const jwt = require('jsonwebtoken');

const errorMsg = {
  headersAreEmpty: 'Headers are empty',
  tokenDoesNoteExist: 'Token does not exist',
  checkAuthMiddlewareFailed: 'CheckAuth middleware failed',
};

/**
 * Middleware that checks for the presence of
 * a valid JWT token in the request headers.
 * If a valid token is found,
 * the decoded user data is added to the request object.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @return {void}
 */
function checkAuth(req, res, next) {
  if (req.method === 'OPTIONS') next();
  if (!req.headers.authorization) {
    res.status(403).json({message: errorMsg.headersAreEmpty});
  } else {
    try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        res.status(403).json({message: errorMsg.tokenDoesNoteExist});
      } else {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData;
        next();
      }
    } catch (e) {
      res.status(403).json({message: errorMsg.checkAuthMiddlewareFailed});
    }
  }
}

module.exports = checkAuth;
