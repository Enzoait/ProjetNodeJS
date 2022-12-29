const { Model, DataTypes } = require("sequelize");
const connexion = require("./Connexion");
class Personnage extends Model {}

Personnage.init(
  {
    id_perso: DataTypes.INTEGER,
    nom_de_famille: DataTypes.STRING,
    prénom: DataTypes.STRING,
    puissance: DataTypes.INTEGER,
    points_de_vie: DataTypes.INTEGER,
  },
  {
    sequelize: connexion,
  }
);
module.exports = Personnage;