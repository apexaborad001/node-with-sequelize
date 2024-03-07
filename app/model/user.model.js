
// const emailvalidator = require("email-validator");
const validator=require("validator")

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      Name: {
        type: Sequelize.STRING
      },
      Age: {
        type: Sequelize.INTEGER
      },
      Gender: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING,
        validator(value){
          if(!validator.isEmail(value)){
            throw new Error("email is invalid")
          }
        }
      },
      Password: {
        type: Sequelize.STRING
      }
    });
    return User;
  };
  