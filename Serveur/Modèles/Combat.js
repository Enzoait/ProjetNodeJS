const { Model, DataTypes } = require("sequelize");
const connexion = require("./Connexion");
const Utilisateur = require("./Utilisateur");
const Personnage = require("./Personnage");
class Combat extends Model {}

Combat.init(
    {
        id_combat : DataTypes.INTEGER
    },
{
sequelize: connexion,
}
);

Utilisateur.hasMany(Combat);
Combat.belongsTo(Utilisateur);


/*
Personnage.hasMany(Combat, {
    foreignKey: "PersonnageId_1",
    sourceKey: "id",
});                                                     //Erreur : Personnage.hasMany is not a function
Combat.belongsTo(Personnage, {
    foreignKey: "PersonnageId_1",
    targetKey: "id",
});

Personnage.hasMany(Combat, {
    foreignKey: "PersonnageId_2",
    sourceKey: "id",
});
Combat.belongsTo(Personnage, {
    foreignKey: "PersonnageId_2",
    targetKey: "id",
});

*/
module.exports = Combat;