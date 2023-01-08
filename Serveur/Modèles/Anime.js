const { Model, DataTypes } = require("sequelize");
const connexion = require("./Connexion");
const Utilisateur = require("./Utilisateur");
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
      defaultValue: "Shonen",
      validate: {
        isIn: [["Shonen","Shojo","Seinen","Josei"]] 
      },
    },
    
  },
  
  {
    sequelize: connexion,
  }
);
Utilisateur.hasMany(Anime);
Anime.belongsTo(Utilisateur);

module.exports = Anime;