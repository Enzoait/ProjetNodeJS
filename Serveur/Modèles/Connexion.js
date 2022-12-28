const Sequelize = require("sequelize");

const URL_BDD = 
  process.env.URL_BDD || //Mettre le lien de sa bdd ici;

const connexion = new Sequelize(URL_BDD);

connexion.authenticate().then(() => console.log("La connexion à la BDD a été établie"));

module.exports = connexion;