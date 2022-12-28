const { Model, DataTypes } = require("sequelize");
const connexion = require("./Connexion");
class Anime extends Model {}

Anime.init(
  {
    id_anime: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    genre: DataTypes.STRING,
  },
  {
    sequelize: connexion,
  }
);
module.exports = Anime;