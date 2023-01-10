const { Router } = require("express");
const Interdiction = require("../Erreurs/Interdiction");
const CheckAutorisation = require("../Middlewares/CheckAutorisation");
const CheckRole = require("../Middlewares/CheckRole");
const { Combat } = require("../Modèles");

const router = new Router();

// Get collection
router.get(
  "/combat",
  CheckAutorisation, 
  CheckRole({ minRole: CheckRole.ROLES.ADMINISTRATEUR}), 
  (req, res) => {
    Combat.findAll({
      where: req.query,
    }).then((data) => res.json(data));
  }
);

// Créer un combat
router.post("/combat", CheckAutorisation,(req, res, next) => {
  if (req.utilisateur.id !== req.body.UtilisateurId) throw new Interdiction();
  const Combat = new Combat(req.body);
  combat
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next);
});

// Récupérer un combat
router.get("/combat/:id", CheckAutorisation, async(req, res) => {

  const utilisateur_id = await Combat.findOne({
    attributes: ['UtilisateurId'],
    where: {
      id: parseInt(req.params.id)
    },
    raw: true
  });

  if(!utilisateur_id){
    res.sendStatus(404);
  } else {

    if (req.utilisateur.id !== utilisateur_id.UtilisateurId){
      res.sendStatus(403);
    } 
    else{
      const combat = await Combat.findByPk(parseInt(req.params.id));
      if (!combat) {
        res.sendStatus(404);
      } else {
        res.json(combat);
      }
    }

  }

});

// Update un combat
router.put("/combat/:id", CheckAutorisation, (req, res, next) => {
  if (req.utilisateur.id !== req.body.UtilisateurId) throw new Interdiction();
  Combat.update(req.body, {
  where: { id: parseInt(req.params.id) },
  individualHooks: true,
})
  .then(([nbUpdated]) => {
    if (!nbUpdated) return res.sendStatus(404);
    Combat.findByPk(parseInt(req.params.id)).then((Combat) => res.json(Combat));
  })
  .catch(next);
});

// Delete un combat
router.delete("/combat/:id", CheckAutorisation, CheckRole({ minRole: CheckRole.ROLES.ADMINISTRATEUR}), (req, res) => {
  
    Combat.destroy({
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

});

module.exports = router;