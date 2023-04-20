const User = require("../Models/Users");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

const createToken = (userId) => {
  const payload = { userId: userId };
  const secretKey = process.env.JWT_SECRET;
  return jwt.sign(payload, secretKey);
};


exports.createUser = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('hey')
    return res.status(422).json({ errors: errors.array() });
  }else{
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  })
    .then((user) => {
      const token = createToken(user.id);
      res.status(200).send({ user, token: token });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
  }
};



exports.Login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ where: { email, password } })
    .then((user) => {
      if (!user) {
        res.send("Invalid email or password.");
      } else {
        const token = createToken(user.id);
        res.status(200).send({ user, token: token, message: "success" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.send("some error");
    });
};

exports.checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log('err: '+ err);
    console.log(decoded);
    if (err) {
      res.send("not valid");
    } else {
      res.send("valid");
    }
  });
};

exports.checkEmail = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        res.send("new");
      } else {
        res.send("exists");
      }
    })
    .catch((error) => {
      console.log(error);
      res.send("some error");
    });
};



// exports.UpdateUser = (req, res, next) => {
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const email = req.body.email;
//   console.log(req.params.id)
//   console.log(req.body.firstName)
//   User.findOne({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then(user => {
//       if (firstName != undefined) {
//         user.firstName = firstName;
//       }
//       if (lastName != undefined) {
//         user.lastName = lastName;
//       }
//       if (email != undefined) {
//         user.email = email;
//       }
//       user.save().then(result => {
//         res.status(200).send('updates');
//       }).catch(err => {
//         res.status(500).send(err.message);
//       })
//     })
// }
