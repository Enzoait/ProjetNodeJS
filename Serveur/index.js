const express = require("express");
const Routeur_Utilisateur = require("./Routes/Utilisateur");
const Routeur_Securite = require("./Routes/Securite");
const Routeur_Personnage = require("./Routes/Personnage");
const Routeur_Anime = require("./Routes/Anime");
const Routeur_Combat = require("./Routes/Combat");
const CheckFormatDeRequete = require("./Middlewares/CheckFormatDeRequete");
const Gestionnaire_d_erreurs = require("./Middlewares/Gestionnaire_d_erreurs");
const app = express();

app.use(express.json());

app.use(function monitor(req, res, next) {
  // Process request monitoring
  console.log("request", req.url);

  // Override default functions with monitored ones
  const FonctionJSON = res.json;
  res.json = function (...args) {
    console.log("response", res.statusCode, JSON.stringify(args));
    return FonctionJSON.call(res, ...args);
  };
  const Envoyer_Statut = res.Envoyer_Statut;
  res.Envoyer_Statut = function (...args) {
    const resultat = Envoyer_Statut.call(res, ...args);
    console.log("response", res.statusCode);
    return resultat;
  };

  next();
});

app.use(CheckFormatDeRequete);
app.use(Routeur_Securite);
app.use(Routeur_Utilisateur);
app.use(Routeur_Personnage);
app.use(Routeur_Anime);
app.use(Routeur_Combat);
app.use(Gestionnaire_d_erreurs);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Le serveur écoute sur le port " + PORT));