module.exports = {
  email: {
    if: {
      options: (value, { req }) => !req.params.id || value
    },
    isEmail: {
      errorMessage: "Le format de l'adresse email est invalide"
    }
  },
  password: {
    if: {
      options: (_, { req }) => !req.params.id
    },
    notEmpty: {
      errorMessage: "Le mot de passe est requis"
    }
  },
  confirm: {
    if: {
      options: (_, { req, location }) => req[location].password
    },
    custom: {
      options: (value, { req, location }) => value === req[location].password,
      errorMessage: "La confirmation ne correspond pas au mot de passe saisi"
    }
  },
  firstname: {
    if: {
      options: (value, { req }) => !req.params.id
    },
    notEmpty: {
      errorMessage: "Le prénom est requis"
    }
  },
  lastname: {
    if: {
      options: (value, { req }) => !req.params.id
    },
    notEmpty: {
      errorMessage: "Le nom de famille est requis"
    }
  },
  slug: {
    if: {
      options: (_, { req }) => req.method === "POST" && /slug$/.test(req.path)
    },
    notEmpty: {
      errorMessage: "Le slug est manquant"
    }
  },
  bio: {
    if: {
      options: (value, { req }) => req.params.id && value
    },
    isLength: {
      options: { max: 140 },
      errorMessage: "La description ne doit pas excéder 140 caractères"
    }
  }
};
