const router = require("express").Router();
const { User } = require("../../models");

router.get("/", (req, res) => {
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/:id", (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "could not find user with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post("/login", (req, res) => {
  User.findOne({
    where: { email: req.body.email },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "could not find user with that email address" });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }
    res.json({ user: dbUserData, message: "login succesful" });
  });
});
router.put("/:id", (req, res) => {
  User.update(req.body, { individualHooks: true, where: { id: req.params.id } })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "no user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "no user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
