const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const Reference = require("./Reference");

class Article extends Model {}

Article.init(
  {
   titlu:{
       type: DataTypes.STRING,
       length: {minimum: 5}
   },
   rezumat:{
    type: DataTypes.STRING,
    length: {minimum: 10}
   }
  },
  {
    sequelize,
    modelName: "Article",
  }
);

Article.hasMany(Reference, {foreignKey: "ArticleId"});

module.exports = Article;
