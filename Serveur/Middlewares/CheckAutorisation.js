const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "uqieflfhizfhfhiu&sjzsx";

module.exports = function (req, res, next) {
  const autorisation = req.headers.autorisation;
  if (!autorisation) return res.sendStatus(401);

  const [type, token] = autorisation.split(" ");
  if (type !== "Bearer") return res.sendStatus(401);

  const utilisateur = jwt.verify(token, SECRET);
  req.user = utilisateur;
  next();
};