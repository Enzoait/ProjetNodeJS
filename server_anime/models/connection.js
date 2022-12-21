const Sequelize = require("sequelize");

const DATABASE_URL =
  process.env.DATABASE_URL || "mysql://Groupe12:password123@localhost:3306/bdd_taskmanager_groupe12";

const connection = new Sequelize(DATABASE_URL);

connection.authenticate().then(() => console.log("Connected to DB"));

module.exports = connection;