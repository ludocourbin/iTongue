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
      const { text } = req.body;

      if (!text || !text.length)
        return res.status(400).json({ errors: [{ msg: "Le message est vide ou manquant" }] });

      const result = await commentDatamapper.insertOne(userId, recordId, text.trim());
      res.status(201).json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { commentId } = req.params;
      const { text } = req.body;

      if (!text || !text.length)
        return res.status(400).json({ errors: [{ msg: "Le message est vide ou manquant" }] });

      const foundComment = await commentDatamapper.getOneById(commentId);

      if (!foundComment)
        return res.status(404).json({ errors: [{ msg: "Ce record n'existe pas" }] });

      if (foundComment.user_id !== userId)
        return res
          .status(403)
          .json({ errors: [{ msg: "Il faut être l'auteur du commentaire pour le modifier" }] });

      await commentDatamapper.updateOne(commentId, text.trim());
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
      if (!foundComment)
        return res.status(404).json({ errors: [{ msg: "Ce record n'existe pas" }] });

      if (foundComment.user_id !== userId)
        return res
          .status(403)
          .json({ errors: [{ msg: "Il faut être l'auteur du commentaire pour le supprimer" }] });

      await commentDatamapper.deleteOne(commentId);
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
};
