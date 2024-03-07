const req = require("express/lib/request");
const res = require("express/lib/response");
const db = require("../model");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { users } = require("../model");
const User = db.users;
const Op = db.Sequelize.Op;

exports.signUp = async (req, res) => {

  const user = {
    Name: req.body.Name,
    Age: req.body.Age,
    Gender: req.body.Gender,
    Email: req.body.Email,
    Password: req.body.Password
  };
  User.create(user)
    .then(data => {
      res.send({
        Error: false,
        StatusCode: 200,
        Message: "User Created Succesfully!!!!",
        Records: Object.keys(data).length,
        Data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        Error: true,
        StatusCode: 500,
        Message: err.message,

      });
    });
};

exports.findAll = (req, res) => {
  const Name = req.query.title
  var condition = Name ? { Name: { [Op.like]: `%${Name}%` } } : null

  User.findAll({ where: condition }).then(data => {
    res.send({
      Error: false,
      StatusCode: 200,
      Message: " All User fetched Succesfully!!!!",
      Records: Object.keys(data).length,
      Data: data
    })
  }).catch(err => {
    res.status(500).send({
      Error: true,
      StatusCode: 500,
      Message: err.message,

    })
  })

}

exports.signIn = (req, res) => {
  const id = req.params.id

  User.findByPk(id).then(data => {
    var token = jwt.sign({ id: users.id }, config.secret, {
      expiresIn: 86400
    })
    res.send({
      Error: false,
      StatusCode: 200,
      Message: "User SignIn Succesfully!!!!",
      Records: Object.keys(data).length,
      Data: data,
      accessToken: token

    })
  }).catch(err => {
    res.status(500).send({
      Error: true,
      StatusCode: 500,
      Message: err.message,

    })
  })
}

exports.update = (req, res) => {
  // const id = req.params.id

  const data = req.body
  User.update(req.body, {
    where: { id: data.id }
  }).then(num => {
    if (num == 1) {
      res.send({
        Error: false,
        StatusCode: 200,
        Message: "User Updated  Succesfully!!!!",
        Records: Object.keys(data).length,
        Data: data
      })
    } else {
      res.send({
        Error: true,
        StatusCode: 500,
        Message: err.message || `Cannot Update user with id=${id}. Maybe User was not found`,
        // Records:Object.keys(num).length,
        // Data:num

      })
    }
  }).catch(err => {
    res.send({
      Error: true,
      StatusCode: 500,
      Message: err.message || `Error Updating Tutorial with id=${id} `,
      // Records:Object.keys(data).length,
      // Data:data

    })
  })


}

exports.delete = (req, res) => {
  const id = req.params.id
  const data = req.body
  User.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        Error: false,
        StatusCode: 200,
        Message: "User deleted  Succesfully!!!!",
        Records: Object.keys(data).length,
        Data: data
      })
    } else {
      res.send({
        Error: true,
        StatusCode: 500,
        Message: err.message || `cannot delete user with id=${id}`,
        // Records:Object.keys(data).length,
        // Data:data

      })
    }
  }).catch(err => {
    res.status(500).send({
      Error: true,
      StatusCode: 500,
      Message: err.message || `could not delete user eith id=${id}`,
      // Records:Object.keys(data).length,
      // Data:data
    })
  })
}

exports.deleteAll = (req, res) => {
  const data = req.body
  User.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({
      Error: false,
      StatusCode: 200,
      Message: "All User deleted  Succesfully!!!!",
      Records: Object.keys(data).length,
      Data: data
    }).catch(err => {
      res.send({
        Error: true,
        StatusCode: 500,
        Message: err.message || `could not delete user eith id=${id}`,
        // Records:Object.keys(data).length,
        // Data:data
      })
    })
  })
}



exports.ResetPassword = async (req, res) => {
  try {
    const Email = req.body.Email
    const Password = req.body.Password
    const userUpdate = await User.update(req.body, { where: { Email: Email } })
    // console.log(userUpdate)
    if (userUpdate[0] > 0) {
      const userExist = await User.findOne({ where: { Email: Email } })

      if (userExist) {
        res.status(200).send({
          Error: false,
          StatusCode: 200,
          Message: `Updating password with Email=${Email} `,
          Records: Object.keys(userExist).length,
          Data: userExist
        })
      }

    }
    else {
      res.status(200).send({
        Error: true,
        StatusCode: 200,
        Message: "Not updated successfully",
        //  Records:Object.keys(data).length,
        // Data:data
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({
      Error: true,
      StatusCode: 500,
      Message: err ? err.message : `Error Updating password with Email=${Email} `,
      // Records:0,
      // Data:{}
    })
  }
}