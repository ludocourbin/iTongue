module.exports = {
  email: {
    isEmail: true,
    errorMessage: "Le format de l'adresse email est invalide"
  },
  password: {
    exists: true,
    errorMessage: "Le mot de passe est requis"
  },
  confirm: {
    custom: {
      options: (value, { req, location }) => value === req[location].password,
      errorMessage: "La confirmation ne correspond pas au mot de passe saisi"
    }
  },
  firstname: {
    isAlphanumeric: {
      errorMessage: "Les caractères spéciaux ne sont pas authorisés pour le prénom"
    }
  },
  lastname: {
    isAlphanumeric: {
      errorMessage: "Les caractères spéciaux ne sont pas authorisés pour le nom de famille"
    }
  }
};
