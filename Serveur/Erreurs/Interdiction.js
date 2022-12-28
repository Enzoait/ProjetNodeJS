const ErreurHttp = require("./ErreurHttp");

class Interdiction extends ErreurHttp {
  constructor() {
    super(403);
  }
}

module.exports = Interdiction;