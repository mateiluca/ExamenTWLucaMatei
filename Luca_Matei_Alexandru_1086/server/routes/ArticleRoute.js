const express = require("express");
const router = express.Router();
const Article = require("../data/Article");

router.post("/", async (req, res) => {
  await Article.create(req.body);
  res.send("article is inserted");
});

router.get("/", async (req, res) => {
  const articles = await Article.findAll();
  res.send(articles);
});

router.get("/:id", async (req, res) => {
  const reqId = req.params.id;
  const article = await Article.findOne({ where: { id: reqId } });

  if (!article) {
    res.status(404).send("The article does not exist");
    return;
  }

  res.send(article);
});


router.put("/:id", async (req, res) => {
  const reqId = req.params.id;
  const article = await Article.findOne({ where: { id: reqId } });

  if (!article) {
    res.status(404).send("The article does not exist");
    return;
  }

  article.titlu = req.body.titlu;
  article.rezumat = req.body.rezumat;
  await article.save();
  res.send("updated");
});

router.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  await Article.destroy({ where: { id: reqId } });
  res.send("removed");
});

module.exports = router;
