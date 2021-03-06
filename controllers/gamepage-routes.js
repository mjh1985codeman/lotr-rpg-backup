const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Character } = require("../models");
const withAuth = require("../utils/auth");

router.get("/game", withAuth, (req, res) => {
  console.log("trying to log ", req.session);
  console.log("==================");
  Character.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "char_name", "char_type", "char_health"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbCharData) => {
      const characters = dbCharData.map((character) =>
        character.get({ plain: true })
      );
      res.render("game", {
        character: characters[characters.length - 1],
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
