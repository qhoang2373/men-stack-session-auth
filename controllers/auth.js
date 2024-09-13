const express = require("express");
const router = express.Router();
const User = require("../models/user.js")
const bcrypt = require("bcrypt");

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
  });

router.post("/sign-up", async (req, res) => {
})

router.post("/sign-in", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send("Login failed. Please try again.")
    }
    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
      );
      if (!validPassword) {
        return res.send("Login failed. Please try again.");
      }
      req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id
      };

      res.redirect("/");
     });
          

const user = await User.create(req.body);
res.send(`Thanks for signing up ${user.username}`);

    // res.send("Form submission accepted!");
  

module.exports = router;
