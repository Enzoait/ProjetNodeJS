class ErrrurHttp extends Error {
    constructor(code) {
      super();
      this.code = code;
    }
  }
  
  module.exports = ErrrurHttp;