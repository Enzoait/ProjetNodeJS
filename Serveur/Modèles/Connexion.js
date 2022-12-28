const Sequelize = require("sequelize");

const DATABASE_URL =
  process.env.DATABASE_URL || "mysql://Savindu:T18sOu5nJ9MGzYjP@88.161.127.190/bdd_taskmanager_groupe12";

const connexion = new Sequelize(URL_BDD);

connexion.authenticate().then(() => console.log("La connexion à la BDD a été établie"));

module.exports = connexion;