const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      jwt.sign(
        { id: user.id },
        config.get("jwtSecrete"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

// router.post("/", (req, res) => {
//   const item = new Item({
//     name: req.body.name,
//   });
//   item.save().then((item) => {
//     res.status(200).json({ item });
//   });
// });

// router.delete("/:id", (req, res) => {
//   Item.findById(req.params.id)
//     .then((item) =>
//       item.remove().then(() => res.status(201).json({ success: true }))
//     )
//     .catch((err) => res.status(404).json({ success: false }));
// });

module.exports = router;
