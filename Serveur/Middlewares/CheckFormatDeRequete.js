const MauvaiseRequete = require("../Erreurs/MauvaiseRequete");

module.exports = function CheckFormatDeRequete(req, res, next) {
  if (req.method === "POST" || req.method === "PUT") {
    if (!req.headers["content-type"]?.startsWith("application/json")) {
      throw new MauvaiseRequete();
    }
  }
  next();
};