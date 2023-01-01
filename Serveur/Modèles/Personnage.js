const { Model, DataTypes } = require("sequelize");
const connexion = require("./Connexion");
const Utilisateur = require("./Utilisateur");
class Personnage extends Model {}

/*Utilisateur.hasOne(Personnage, {
  foreignKey: "id_utilisateur",
  sourceKey: "id",
});*/

Personnage.init(
  {
    nom_de_famille: DataTypes.STRING,
    prénom: DataTypes.STRING,
    puissance: DataTypes.INTEGER,
    points_de_vie: DataTypes.INTEGER,
    //id_utilisateur: DataTypes.INTEGER
  },
  {
    sequelize: connexion,
  }
);
module.exports = Personnage;

