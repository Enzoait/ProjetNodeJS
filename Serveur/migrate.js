const { connection } = require("./Modèles");

connection
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .then(() => connection.close());