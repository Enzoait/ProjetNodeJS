const Sequelize = require("sequelize");

const DATABASE_URL =
  process.env.DATABASE_URL || "mysql://Savindu:T18sOu5nJ9MGzYjP@88.161.127.190/bdd_taskmanager_groupe12";

const connection = new Sequelize(DATABASE_URL);

connection.authenticate().then(() => console.log("Connected to DB"));

module.exports = connection;