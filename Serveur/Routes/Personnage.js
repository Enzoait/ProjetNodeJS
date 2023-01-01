const { Router } = require("express");
const Interdiction = require("../Erreurs/Interdiction");
const { Personnage } = require("../Modèles");

const router = new Router();

// Get collection
router.get(
    "/personnage", 
    (req, res) => {
      Personnage.findAll({
        where: req.query,
      }).then((data) => res.json(data));
    }
  );
  
  // Créer un personnage
  router.post("/personnage", (req, res, next) => {
    const personnage = new Personnage(req.body);
    personnage
      .save()
      .then((data) => res.status(201).json(data))
      .catch(next);
  });
  
  // Récupérer un personnage
  router.get("/personnage/:id", async (req, res) => {
    const personnage = await Personnage.findByPk(parseInt(req.params.id));
    if (!personnage) {
      res.sendStatus(404);
    } else {
      res.json(personnage);
    }
  });
  
  // Update un personnage
  router.put("/personnage/:id", (req, res, next) => {
    if (req.personnage.id !== parseInt(req.params.id)) throw new Interdiction();
    Personnage.update(req.body, {
      where: { id: parseInt(req.params.id) },
      individualHooks: true,
    })
      .then(([nbUpdated]) => {
        if (!nbUpdated) return res.sendStatus(404);
        Personnage.findByPk(parseInt(req.params.id)).then((personnage) => res.json(personnage));
      })
      .catch(next);
  });
  
  // Delete un personnage
  router.delete("/personnage/:id", (req, res) => {
    if (req.personnage.id !== parseInt(req.params.id)) throw new Interdiction();
    Personnage.destroy({
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