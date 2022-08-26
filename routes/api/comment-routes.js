const router = require("express").Router();
const { Comment } = require("../../models");

router.get("/", (req, res) => {
  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  const { comment_text, user_id, post_id } = req.body;
  Comment.create({
    comment_text,
    user_id,
    post_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
