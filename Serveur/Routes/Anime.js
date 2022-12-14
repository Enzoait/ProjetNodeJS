const { Router } = require("express");
const Interdiction = require("../Erreurs/Interdiction");
const CheckAutorisation = require("../Middlewares/CheckAutorisation");
const CheckRole = require("../Middlewares/CheckRole");
const { Anime, Personnage} = require("../Modèles");

const anime_router = new Router();

// Get collection
anime_router.get(
  "/animes",
  CheckAutorisation,
  CheckRole({ minRole: CheckRole.ROLES.ADMINISTRATEUR}), 
  (req, res) => {
    Anime.findAll({
      where: req.query,
    }).then((data) => res.json(data));
  }
);

// Créer un anime
anime_router.post("/animes", CheckAutorisation, (req, res, next) => {
  if (req.utilisateur.id !== req.body.UtilisateurId) throw new Interdiction();
  const anime = new Anime(req.body);
  anime
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next);
});

// Récupérer un anime item
anime_router.get("/animes/:id", CheckAutorisation, async(req, res) => {

  const utilisateur_id = await Anime.findOne({
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
      const anime = await Anime.findByPk(parseInt(req.params.id));
      if (!anime) {
        res.sendStatus(404);
      } else {
        res.json(anime);
      }
    }

  }

});

// Affichez nombre de personnages dans un anime
anime_router.get("/animes_perso/:id", CheckAutorisation, async(req, res) => {

  const utilisateur_id = await Anime.findOne({
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
      const count_personnage = await Personnage.count({
        where: {
          Animeid: parseInt(req.params.id)
        },
      });
      if (!count_personnage) {
        res.sendStatus(404);
      } else {
        res.json(count_personnage);
      }
    }

  }

});

anime_router.put("/animes/:id", CheckAutorisation, (req, res, next) => {
  if (req.utilisateur.id !== req.body.UtilisateurId) throw new Interdiction();
  Anime.update(req.body, {
    where: { id: parseInt(req.params.id) },
    individualHooks: true,
  })
    .then(([nbUpdated]) => {
      if (!nbUpdated) return res.sendStatus(404);
      Anime.findByPk(parseInt(req.params.id)).then((Anime) => res.json(Anime));
    })
    .catch(next);
});
  
// Delete un anime
anime_router.delete("/animes/:id", CheckAutorisation, 
  CheckRole({ minRole: CheckRole.ROLES.ADMINISTRATEUR}), 
  (req, res, next) => {
  Anime.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  }).then((nbDeleted) => {
    if (nbDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404); 
    }
  }).catch(next);
});


module.exports = anime_router;