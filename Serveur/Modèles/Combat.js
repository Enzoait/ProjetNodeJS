const { Model, DataTypes } = require("sequelize");
const connexion = require("./Connexion");
class Combat extends Model {}

Combat.init({

{
 sequelize: connexion,
}
});
module.exports = Combat;