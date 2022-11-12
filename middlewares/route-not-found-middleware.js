const routeNotFoundMiddleware = (req, res, next) => {
  res.status(404).send("Route Does Not Exist");
};

module.exports = routeNotFoundMiddleware;
