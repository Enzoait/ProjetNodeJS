const Interdiction = require("../Erreurs/Interdiction");

const ROLES = {
  UTILISATEUR: 0,
  ADMINISTRATEUR: 1,
  SUPER_ADMINISTRATEUR: 2,
};

function CheckRole({ minRole }) {
  return function checkRoleMiddleware(req, res, next) {
    const Role_utilisateur = req.user.rôle;
    console.log(Role_utilisateur, minRole);
    if (ROLES[Role_utilisateur] >= minRole) {
      next();
    } else {
      throw new Interdiction();
    }
  };
}

CheckRole.ROLES = ROLES;

module.exports = CheckRole;