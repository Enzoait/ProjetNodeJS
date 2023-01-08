const { Router } = require("express");
const Interdiction = require("../Erreurs/Interdiction");
const CheckAutorisation = require("../Middlewares/CheckAutorisation");
const CheckRole = require("../Middlewares/CheckRole");
const { Utilisateur } = require("../Modèles");

const router = new Router();

// Get collection
router.get(
  "/users",
  CheckAutorisation,
  CheckRole({ minRole: CheckRole.ROLES.ADMINISTRATEUR}), 
  (req, res) => {
    Utilisateur.findAll({
      where: req.query,
      attributes: { exclude: ["mot_de_passe"] },
    }).then((data) => res.json(data));
  }
);

// Créer un user
router.post("/users", (req, res, next) => {
  const utilisateur = new Utilisateur(req.body);
  utilisateur
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next);
});

// Récupérer un user
router.get("/users/:id", async (req, res) => {
  const utilisateur = await Utilisateur.findByPk(parseInt(req.params.id), {
    attributes: { exclude: "mot_de_passe" },
  });
  if (!utilisateur) {
    res.sendStatus(404);
  } else {
    res.json(utilisateur);
  }
});

// Update un user
router.put("/users/:id", CheckAutorisation, (req, res, next) => {
  if (req.utilisateur.id !== parseInt(req.params.id)) throw new Interdiction();
  Utilisateur.update(req.body, {
    where: { id: parseInt(req.params.id) },
    individualHooks: true,
  })
    .then(([nbUpdated]) => {
      if (!nbUpdated) return res.sendStatus(404);
      Utilisateur.findByPk(parseInt(req.params.id), {
        attributes: { exclude: "mot_de_passe" },
      }).then((utilisateur) => res.json(utilisateur));
    })
    .catch(next);
});

// Delete un utilisateur
router.delete(
  "/users/:id", 
  CheckAutorisation,
  CheckRole({ minRole: CheckRole.ROLES.ADMINISTRATEUR}), 
  (req, res) => {
    Utilisateur.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    }).then((nbDeleted) => {
      if (nbDeleted) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    });
  }
);

module.exports = router;