const { Router } = require("express");
const Interdiction = require("../Erreurs/Interdiction");
const CheckAutorisation = require("../Middlewares/CheckAutorisation");
const CheckRole = require("../Middlewares/CheckRole");
const { Anime } = require("../Modèles");

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
anime_router.get("/animes/:id", CheckAutorisation, async (req, res) => {
  const utilisateur_id = await Anime.findAll({
    attributes: ['UtilisateurId'],
    where: {
      id: parseInt(req.params.id)
    }
  });
  if (req.utilisateur.id !== utilisateur_id) throw new Interdiction();
  const anime = await Anime.findByPk(parseInt(req.params.id));
  if (!anime) {
    res.sendStatus(404);
  } else {
    res.json(anime);
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
anime_router.delete("/animes/:id", (req, res) => {
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
  });
});

module.exports = anime_router;