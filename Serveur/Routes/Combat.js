const { Router } = require("express");
const Interdiction = require("../Erreurs/Interdiction");
const { Combat } = require("../Modèles");

const router = new Router();

// Get collection
router.get(
    "/combat", 
    (req, res) => {
      Combat.findAll({
        where: req.query,
      }).then((data) => res.json(data));
    }
  );
  
  // Créer un combat
  router.post("/combat", (req, res, next) => {
    const combat = new Combat(req.body);
    combat
      .save()
      .then((data) => res.status(201).json(data))
      .catch(next);
  });
  
  // Récupérer un combat
  router.get("/combat/:id", async (req, res) => {
    const combat = await Combat.findByPk(parseInt(req.params.id));
    if (!combat) {
      res.sendStatus(404);
    } else {
      res.json(combat);
    }
  });
  
  // Update un combat
  router.put("/combat/:id", (req, res, next) => {
    if (req.combat.id !== parseInt(req.params.id)) throw new Interdiction();
    Combat.update(req.body, {
      where: { id: parseInt(req.params.id) },
      individualHooks: true,
    })
      .then(([nbUpdated]) => {
        if (!nbUpdated) return res.sendStatus(404);
        Combat.findByPk(parseInt(req.params.id)).then((combat) => res.json(combat));
      })
      .catch(next);
  });
  
  // Delete un combat
  router.delete("/combat/:id", (req, res) => {
    if (req.combat.id !== parseInt(req.params.id)) throw new Interdiction();
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