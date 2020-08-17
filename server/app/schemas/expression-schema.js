module.exports = {
  label: {
    matches: {
      options: /\b/,
      errorMessage: "Le label de l'expression doit être une chaîne de caractère de type alpha numérique"
    }
  },
  text: {
    matches: {
      options: /\b/,
      errorMessage: "La traduction de l'expression doit être une chaîne de caractère de type alpha numérique"
    }
  },
  language_id: {
    isInt: {
      errorMessage: "L'ID du langage doit être un INTEGER"
    }
  }
};
