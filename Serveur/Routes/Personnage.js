const { Router } = require("express");
const Interdiction = require("../Erreurs/Interdiction");
const CheckAutorisation = require("../Middlewares/CheckAutorisation");
const { Personnage } = require("../Modèles");
const CheckRole = require("../Middlewares/CheckRole");

const router = new Router();

// Get collection
router.get(
    "/personnage",
    CheckAutorisation, 
    CheckRole({ minRole: CheckRole.ROLES.ADMINISTRATEUR}), 
    (req, res) => {
      Personnage.findAll({
        where: req.query,
      }).then((data) => res.json(data));
    }
  );
  
  // Créer un personnage
  router.post("/personnage", CheckAutorisation,(req, res, next) => {
    if (req.utilisateur.id !== req.body.UtilisateurId) throw new Interdiction();
    const personnage = new Personnage(req.body);
    personnage
      .save()
      .then((data) => res.status(201).json(data))
      .catch(next);
  });
  
  // Récupérer un personnage
  router.get("/personnage/:id", CheckAutorisation, async(req, res) => {

    const utilisateur_id = await Personnage.findOne({
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
        const personnage = await Personnage.findByPk(parseInt(req.params.id));
        if (!personnage) {
          res.sendStatus(404);
        } else {
          res.json(personnage);
        }
      }
  
    }
  
  });
  
  // Update un personnage
  router.put("/personnage/:id", CheckAutorisation, (req, res, next) => {
    if (req.utilisateur.id !== req.body.UtilisateurId) throw new Interdiction();
    Personnage.update(req.body, {
    where: { id: parseInt(req.params.id) },
    individualHooks: true,
  })
    .then(([nbUpdated]) => {
      if (!nbUpdated) return res.sendStatus(404);
      Personnage.findByPk(parseInt(req.params.id)).then((Personnage) => res.json(Personnage));
    })
    .catch(next);
});
  
  // Delete un personnage
  router.delete("/personnage/:id", CheckAutorisation, CheckRole({ minRole: CheckRole.ROLES.ADMINISTRATEUR}), (req, res) => {
    
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