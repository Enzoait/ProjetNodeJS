class ErreurHttp extends Error {
    constructor(code) {
      super();
      this.code = code;
    }
  }
  
module.exports = ErreurHttp;