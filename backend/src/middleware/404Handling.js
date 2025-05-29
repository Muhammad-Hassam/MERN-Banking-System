const ApiError = require("../utils/apiError");

const NotFoundError = (err, req, res, next) => {
  const error_obj = {
    code: 500,
    msg: err.message,
    stack: err.stack,
  };
  if (err instanceof ApiError) {
    err.statusCode = err.statusCode;
  }
  res.status(error_obj.code).send(error_obj);
};
module.exports = NotFoundError;
