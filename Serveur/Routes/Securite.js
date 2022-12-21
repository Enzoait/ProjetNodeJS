const { Router } = require("express");
const { Utilisateur } = require("../Modèles");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const securite = new Router();
const SECRET = process.env.JWT_SECRET || "uqieflfhizfhfhiu&sjzsx";

securite.post("/login", async (req, res) => {
  const utilisateur = await Utilisateur.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!utilisateur) return res.sendStatus(401);
  if (!(await bcrypt.compare(req.body.mot_de_passe, utilisateur.mot_de_passe)))
    return res.sendStatus(401);
  console.log(utilisateur.role);
  res.json({
    token: jwt.sign(
      {
        nom_de_famille: utilisateur.nom_de_famille,
        prénom: utilisateur.prénom,
        id: utilisateur.id,
        role: utilisateur.role,
      },
      SECRET
    ),
  });
});

module.exports = securite;