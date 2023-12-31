const AppHelper = {
  handleAsyncError: function(fn) {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  },
  throwError: function(res, msg, err = '') {
    let errorMessage;
    if (msg && err) errorMessage = `${msg} -> ${err}`;
    else if (msg) errorMessage = `${msg}`;
    else errorMessage = `${msg}`;

    return res.status(400).json({message: errorMessage});
  },
  isDateExist: (req, res)=>{
    if (!Object.keys(req.body).length) return AppHelper.throwError(res, 'noDataToUpdate');
  },
};

module.exports = AppHelper;
