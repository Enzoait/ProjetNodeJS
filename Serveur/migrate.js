const { Connexion } = require("./Modèles");

Connexion
  .sync({ alter: true })
  .then(() => console.log("Base de donnée synchronisée"))
  .then(() => Connexion.close());