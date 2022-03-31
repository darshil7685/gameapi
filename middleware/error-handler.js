const logger = require("../logger");


function errorHandler(err, req, res, next) {
  switch (true) {
    case typeof err === "string":
      // custom application error
      const is404 = err.toLowerCase().endsWith("not found");
      const statusCode = is404 ? 404 : 400;

      //console.error("Error :"+err);
      logger.error(err);
      return res.status(statusCode).json({ message: err });

    case err.name === "UnauthorizedError":
      // jwt authentication error
      //console.error("Error :"+err);
      logger.error(err);
      return res.status(401).json({ message: "Unauthorized" });

    default:
      //console.error("Error :"+err.message);
      logger.error(err);
      return res.status(500).json({ message: err.message });
  }
}
module.exports = errorHandler;
