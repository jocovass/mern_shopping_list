const express = require("express");
const Item = require("../../models/Item");
const auth = require("../../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.status(200).json({ items }));
});

router.post("/", auth, (req, res) => {
  console.log(req.body);
  const item = new Item({
    name: req.body.name,
  });
  item
    .save()
    .then((item) => {
      res.status(200).json({ item });
    })
    .catch((err) => console.log(err));
});

router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) =>
      item.remove().then(() => res.status(201).json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
