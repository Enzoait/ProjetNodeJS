const Interdiction = require("../Erreurs/Interdiction");

const ROLES = {
  USER: 0,
  ADMIN: 1,
  SUPER_ADMIN: 2,
};

function CheckRole({ minRole }) {
  return function checkRoleMiddleware(req, res, next) {
    const Role_utilisateur = req.utilisateur.role;
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