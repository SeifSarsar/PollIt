const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ err: "Access denied" });
  }

  jwt.verify(token, "sefoune", (err, decoded) => {
    if (err) {
      return res.status(401).send(err);
    }
    req.user = decoded;
    next();
  });
}

module.exports = auth;
