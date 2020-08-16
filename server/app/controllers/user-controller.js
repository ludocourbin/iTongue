const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const slugify = require("slugify");

const userDatamapper = require("../db/user-datamapper");

const { SALT_ROUNDS } = require("../constants");

module.exports = {
  create: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password, firstname, lastname } = req.body;

      const user = await userDatamapper.findOne({ email: { operator: "=", value: email } });

      if (user) return res.status(409).json({ errors: ["L'adresse email existe déjà"] });

      let userSlug = slugify(firstname + " " + lastname);
      const slugsRows = await userDatamapper.findSlugs(userSlug);
      const slugs = slugsRows.map(row => row.slug);

      if (slugs.includes(userSlug)) {
        const lastSuffixInDb = slugs[0].match(/\d+$/);
        const suffix = lastSuffixInDb ? parseInt(lastSuffixInDb[0], 10) + 1 : 1;
        userSlug += suffix;
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const result = await userDatamapper.insertOne({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        slug: userSlug
      });

      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
};
