const express = require("express");
const router = express.Router();
const Reference = require("../data/Reference");

router.post("/", async (req, res) => {
  await Reference.create(req.body);
  res.send("reference is inserted");
});

router.get("/", async (req, res) => {
  const references = await Reference.findAll();
  res.send(references);
});

router.get("/:id", async (req, res) => {
  const reqId = req.params.id;
  const reference = await Reference.findOne({ where: { id: reqId } });

  if (!reference) {
    res.status(404).send("The reference does not exist");
    return;
  }

  res.send(reference);
});

router.get("/article/:id", async (req, res) => {
    const reqId = req.params.id;
    const reference = await Reference.findAll({ where: { ArticleId: reqId } });
  
    if (!reference) {
      res.status(404).send("The reference does not exist");
      return;
    }
  
    res.send(reference);
  });


router.put("/:id", async (req, res) => {
  const reqId = req.params.id;
  const reference = await Reference.findOne({ where: { id: reqId } });

  if (!reference) {
    res.status(404).send("The reference does not exist");
    return;
  }

  reference.titlu = req.body.titlu;
  reference.autori = req.body.autori;
  await reference.save();
  res.send("updated");
});

router.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  await Reference.destroy({ where: { id: reqId } });
  res.send("removed");
});

module.exports = router;
