module.exports = {
    email: {
        if: {
            options: (value, { req }) => !req.params.id || value
        },
        isEmail: true,
        errorMessage: "Le format de l'adresse email est invalide"
    },
    password: {
        if: {
            options: (_, { req }) => !req.params.id
        },
        exists: true,
        errorMessage: "Le mot de passe est requis"
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
            options: (value, { req }) => !req.params.id || value
        },
        isAlphanumeric: {
            errorMessage: "Le prénom doit être composé de caractères alphanumériques"
        }
    },
    lastname: {
        if: {
            options: (value, { req }) => !req.params.id || value
        },
        isAlphanumeric: {
            errorMessage: "Le nom de famille doit être composé de caractères alphanumériques"
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
