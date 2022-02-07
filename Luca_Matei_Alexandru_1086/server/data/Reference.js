const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const Article = require("./Article");

class Reference extends Model {}

Reference.init(
  {
   titlu:{
       type: DataTypes.STRING,
       length: {minimum: 5}
   },
   autori:{
    type: DataTypes.STRING,
   }
  },
  {
    sequelize,
    modelName: "Reference",
  }
);


module.exports = Reference;
