const { Model, DataTypes } = require("sequelize");
const connexion = require("./connexion");
const bcrypt = require("bcryptjs");
class Utilisateur extends Model {}

Utilisateur.init(
  {
    nom_de_famille: DataTypes.STRING,
    prénom: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    rôle: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "UTILISATEUR",
      validate: {
        isIn: ["UTILISATEUR", "ADMINISTRATEUR"],
      },
    },
  },
  {
    sequelize: connexion,
  }
);

Utilisateur.addHook("beforeCreate", async (utilisateur) => {
  utilisateur.mot_de_passe = await bcrypt.hash(utilisateur.mot_de_passe, await bcrypt.genSalt());
});
Utilisateur.addHook("beforeUpdate", async (utilisateur, { fields }) => {
  if (fields.includes("password")) {
    utilisateur.mot_de_passe = await bcrypt.hash(utilisateur.mot_de_passe, await bcrypt.genSalt());
  }
});

module.exports = Utilisateur;