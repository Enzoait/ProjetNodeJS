const Sequelize = require("sequelize");
/*
const URL_BDD = 
  process.env.URL_BDD || "mysql://Groupe12:password123@localhost:3306/bdd_taskmanager_groupe12";

  
const connexion = new Sequelize(URL_BDD);
*/
const connexion = new Sequelize(
  'Anime_db',
  'root',
  'savindudesaram',
   {
     host: 'localhost',
     dialect: 'mysql'
   }
 );

connexion.authenticate().then(() => console.log("La connexion à la BDD a été établie"));

module.exports = connexion;