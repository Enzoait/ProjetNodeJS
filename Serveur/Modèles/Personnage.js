const { Model, DataTypes } = require("sequelize");
const connexion = require("./Connexion");
const Utilisateur = require("./Utilisateur");
const Anime = require("./Anime");
class Personnage extends Model {}


Personnage.init(
  {
    nom_de_famille: DataTypes.STRING,
    prénom: DataTypes.STRING,
    puissance: DataTypes.INTEGER,
    points_de_vie: DataTypes.INTEGER,
  },
  {
    sequelize: connexion,
  }
);

Utilisateur.hasMany(Personnage);
Personnage.belongsTo(Utilisateur);

Anime.hasMany(Personnage, {
  foreignKey: "AnimeId",
  sourceKey: "id",
});
Personnage.belongsTo(Anime, {
  foreignKey: "AnimeId",
  targetKey: "id",
});

module.exports = Personnage;

