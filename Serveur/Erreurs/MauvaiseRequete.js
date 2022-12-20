const ErreurHttp = require("./ErreurHttp");

class MauvaiseRequete extends ErreurHttp {
  constructor() {
    super(400);
  }
}

module.exports = MauvaiseRequete;