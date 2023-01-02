const { Router } = require("express");
const Interdiction = require("../Erreurs/Interdiction");
const { Anime } = require("../Modèles");

const anime_router = new Router();

// Get collection
anime_router.get(
  "/animes",
  //CheckAutorisation,
  //CheckRole({ minRole: CheckRole.ROLES.ADMINISTRATEUR}), 
  (req, res) => {
    Anime.findAll({
      where: req.query,
    }).then((data) => res.json(data));
  }
);

// Créer un user
anime_router.post("/animes", (req, res, next) => {
  const anime = new Anime(req.body);
  anime
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next);
});

// Récupérer un user
anime_router.get("/animes/:id", async (req, res) => {
  const utilisateur = await Anime.findByPk(parseInt(req.params.id), {
    attributes: { exclude: "mot_de_passe" },
  });
  if (!utilisateur) {
    res.sendStatus(404);
  } else {
    res.json(utilisateur);
  }
});

anime_router.put("/animes/:id", (req, res, next) => {
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