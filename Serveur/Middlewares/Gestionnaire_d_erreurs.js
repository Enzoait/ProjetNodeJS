const { ValidationError } = require("sequelize");
const ErreurHttp = require("../Erreurs/ErreurHttp");

module.exports = function Gestion_d_erreur(error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(422).json(
      error.errors.reduce((acc, item) => {
        acc[item.path] = [...(acc[item.path] || []), item.message];
        return acc;
      }, {})
    );
  } else if (error instanceof ErreurHttp) {
    res.sendStatus(error.code);
  } else {
    res.sendStatus(500);
  }
  console.error(error);
};