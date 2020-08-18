module.exports = {
  name: {
    isAlpha: {
      errorMessage: "Le nom de la langue ne peut contenir que des lettres"
    }
  },
  code: {
    matches: {
      options: /(^\w{2}$)|(^\w{2}_\w{2}$)/ ,
      errorMessage: "Le code de la langue doit être du format [en] ou [en_US]"
    }
  }
};
