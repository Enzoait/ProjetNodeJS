const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "uqieflfhizfhfhiu&sjzsx";

module.exports = function (req, res, next) {
  const Authorization = req.headers.authorization;
  if (!Authorization) return res.sendStatus(401);

  const [type, token] = Authorization.split(" ");
  if (type !== "Bearer") return res.sendStatus(401);

  const utilisateur = jwt.verify(token, SECRET);
  req.utilisateur = utilisateur;
  next();
};