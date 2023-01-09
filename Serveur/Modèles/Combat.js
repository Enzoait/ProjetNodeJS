const { Model, DataTypes } = require("sequelize");
const connexion = require("./Connexion");
class Combat extends Model {}

Combat.init(
    {
        prénom1: DataTypes.STRING,
        prénom2: DataTypes.STRING,
        vainqueur: DataTypes.STRING,
        points_de_vie_restant: DataTypes.INTEGER,
    },
{
sequelize: connexion,
}
);
module.exports = Combat;