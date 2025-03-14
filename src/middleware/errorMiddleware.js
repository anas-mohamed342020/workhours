export const globalError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(error, res);
  } else {
    sendErrorForProd(error, res);
  }
};

const sendErrorForDev = (error, res) => {
  return res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorForProd = (error, res) => {
  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
