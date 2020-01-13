function errorHandler(err, req, res, next) {
  res.status(400);
  if (err.name == "MongoError") {
    if (err.code == 11000) {
      if (err.message.includes("username")) {
        return res.json("Username already exists");
      }
      if (err.message.includes("email")) {
        return res.json("Email already exists");
      }
    }
  }
  return res.json("Unknown Error");
}

module.exports = errorHandler;
