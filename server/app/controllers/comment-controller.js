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
      const { comment } = req.body;
      const result = await commentDatamapper.insertOne(userId, recordId, comment);
      res.status(201).json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { commentId } = req.params;
      const { comment } = req.body;

      const foundComment = await commentDatamapper.getOneById(commentId);

      if (foundComment.user_id !== userId)
        return res
          .status(403)
          .json({ errors: [{ msg: "Il faut être l'auteur du commentaire pour le modifier" }] });

      await commentDatamapper.updateOne(commentId, comment);
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
      if (foundComment && foundComment.user_id !== userId)
        return res
          .status(403)
          .json({ errors: [{ msg: "Il faut être l'auteur du commentaire pour le modifier" }] });

      await commentDatamapper.deleteOne(commentId);
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
};
