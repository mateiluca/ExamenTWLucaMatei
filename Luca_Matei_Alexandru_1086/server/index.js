const express = require("express");
const sequelize = require("./database");
const article = require("./routes/ArticleRoute");
const reference = require("./routes/ReferenceRoute");
const cors = require("cors");

sequelize.sync({ force: true }).then(() => console.log("db ready"));

const app = express();

app.use(express.json());
app.use(cors());
app.use("/article", article);
app.use("/reference", reference);

app.listen(8080, () => {
  console.log("app is running");
});
