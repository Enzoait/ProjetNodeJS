const { Model, DataTypes } = require("sequelize");
const connexion = require("./Connexion");
const Personnage = require("./Personnage");
const Utilisateur = require("./Utilisateur");
class Combat extends Model {}

Combat.init(
    {
        vainceur: DataTypes.STRING,
    },
    {
    sequelize: connexion,
    }

);

Utilisateur.hasMany(Combat);
Combat.belongsTo(Utilisateur);

Personnage.hasMany(Combat, {
    foreignKey: "PersonnageId_1",
    sourceKey: "id",
});                                                     
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


module.exports = Combat;