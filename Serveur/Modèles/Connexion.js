const Sequelize = require("sequelize");

const URL_BDD =
  process.env.URL_BDD || "mysql://Groupe12:password123@localhost:3306/bdd_taskmanager_groupe12";

const connection = new Sequelize(URL_BDD);

connection.authenticate().then(() => console.log("La connexion à la BDD a été établie"));

module.exports = connection