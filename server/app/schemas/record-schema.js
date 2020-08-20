module.exports = {
  id: {
    in: ["params"],
    isInt: true,
    errorMessage: "L'identifiant utilisateur reçu dans l'url est invalide"
  },
  translation_id: {
    in: ["body"],
    isInt: true,
    errorMessage: "L'identifiant de la traduction doit être de type INTEGER"
  }
};
