const commentDatamapper = require("../db/comment-datamapper");

module.exports = {
  showAllByRecordId: async (req, res, next) => {
    try {
      const { recordId } = req.params;
      const { limit } = req.query;
      const comments = await commentDatamapper.getAllByRecordId(recordId, limit);
      res.json({ data: comments });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { recordId } = req.params;
<<<<<<< HEAD
      const { comment } = req.body;
      const result = await commentDatamapper.insertOne(userId, recordId, comment);
=======
      const { text } = req.body;

      if (!text || !text.length)
        return res.status(400).json({ errors: [{ msg: "Le message est vide ou manquant" }] });

      const result = await commentDatamapper.insertOne(userId, recordId, text.trim());
>>>>>>> 0854594... feat(router, datamapper, controller): add CRUD to comments
      res.status(201).json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { commentId } = req.params;
<<<<<<< HEAD
      const { comment } = req.body;

      const foundComment = await commentDatamapper.getOneById(commentId);

=======
      const { text } = req.body;

      if (!text || !text.length)
        return res.status(400).json({ errors: [{ msg: "Le message est vide ou manquant" }] });

      const foundComment = await commentDatamapper.getOneById(commentId);

      if (!foundComment)
        return res.status(404).json({ errors: [{ msg: "Ce record n'existe pas" }] });

>>>>>>> 0854594... feat(router, datamapper, controller): add CRUD to comments
      if (foundComment.user_id !== userId)
        return res
          .status(403)
          .json({ errors: [{ msg: "Il faut être l'auteur du commentaire pour le modifier" }] });

<<<<<<< HEAD
      await commentDatamapper.updateOne(commentId, comment);
=======
      await commentDatamapper.updateOne(commentId, text.trim());
>>>>>>> 0854594... feat(router, datamapper, controller): add CRUD to comments
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { commentId } = req.params;

      const foundComment = await commentDatamapper.getOneById(commentId);
<<<<<<< HEAD
      if (foundComment && foundComment.user_id !== userId)
        return res
          .status(403)
          .json({ errors: [{ msg: "Il faut être l'auteur du commentaire pour le modifier" }] });
=======
      if (!foundComment)
        return res.status(404).json({ errors: [{ msg: "Ce record n'existe pas" }] });

      if (foundComment.user_id !== userId)
        return res
          .status(403)
          .json({ errors: [{ msg: "Il faut être l'auteur du commentaire pour le supprimer" }] });
>>>>>>> 0854594... feat(router, datamapper, controller): add CRUD to comments

      await commentDatamapper.deleteOne(commentId);
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
};
