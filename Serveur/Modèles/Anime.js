const { Model, DataTypes } = require("sequelize");
const connexion = require("./Connexion");
class Anime extends Model {}

Anime.init(
  {
    
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    autheur: DataTypes.STRING,
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Inconnue",
      validate: {
        isIn: [["Shonen","Shojo","Seinen","Josei"]] 
      },
    },
    
  },
  
  {
    sequelize: connexion,
  }
);
module.exports = Anime;