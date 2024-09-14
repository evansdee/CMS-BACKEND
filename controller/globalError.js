const sendDevError = (error, res) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message;
  const stack = error.stack;

  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

const sendProError = (error, res) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message;
  const stack = error.stack;

  if (error.isOperational) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }

  console.log(error.name,error.message,stack)
  return res.status(500).json({
    status: "error",
    message: "something went very wrong",
  });
};

const globalErrorHandler = (err, req, res, next) => {


  if (process.env.NODE_ENV === "development") {
    return sendDevError(err, res);
  }

  sendProError(err, res);
};

module.exports = globalErrorHandler;
