const { Router } = require("express");
const Interdiction = require("../Erreurs/Interdiction");
const CheckAutorisation = require("../Middlewares/CheckAutorisation");
const CheckRole = require("../Middlewares/CheckRole");
const { Combat, Personnage } = require("../Modèles");

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

// Créer un combat
router.post("/combat",async(req, res, next) => {
  
  let perso1_points_de_vie = await Personnage.findOne({
    attributes: ['points_de_vie'],
    where: {
      id: req.body.PersonnageId_1
    },
    raw: true
  });
  
  if(!perso1_points_de_vie){
    res.sendStatus(404);
  } 

  let perso2_points_de_vie = await Personnage.findOne({
    attributes: ['points_de_vie'],
    where: {
      id: req.body.PersonnageId_2
    },
    raw: true
  });

  if(!perso2_points_de_vie){
    res.sendStatus(404);
  } 

  let perso1_puissance = await Personnage.findOne({
    attributes: ['puissance'],
    where: {
      id: req.body.PersonnageId_1
    },
    raw: true
  });

  if(!perso1_puissance){
    res.sendStatus(404);
  } 


  let perso2_puissance = await Personnage.findOne({
    attributes: ['puissance'],
    where: {
      id: req.body.PersonnageId_2
    },
    raw: true
  });

  if(!perso2_puissance){
    res.sendStatus(404);
  } 

  let Etat_perso1 = perso1_points_de_vie.points_de_vie;
  let Etat_perso2 = perso2_points_de_vie.points_de_vie;

  while((Etat_perso1 > 0) || (Etat_perso2 > 0)){
    Etat_perso1 = Etat_perso1-perso2_puissance.puissance;
    Etat_perso2 = Etat_perso2-perso1_puissance.puissance;
  }

  let result;
  if(Etat_perso1 < Etat_perso2){
    result = req.body.PersonnageId_2
  }

  if(Etat_perso2 < Etat_perso1){
    result = req.body.PersonnageId_1
  }
  
  const combat = await Combat.create({
    PersonnageId_1: req.body.PersonnageId_1,
    PersonnageId_2: req.body.PersonnageId_2,
    UtilisateurId: req.body.UtilisateurId,
    vainceur: result
  });
     
  combat
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next)
  
});

// Delete un combat
router.delete("/combat/:id", 
  CheckAutorisation, 
  CheckRole({ minRole: CheckRole.ROLES.ADMINISTRATEUR}), 
  (req, res) => {
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