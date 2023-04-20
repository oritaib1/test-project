const User = require("../Models/Users");
const jwt = require("jsonwebtoken");
const Project = require("../Models/Project");
const { body, validationResult } = require("express-validator");

exports.createProject = (req, res, next) => {
  const token = req.body.token;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('hey')
    return res.status(422).json({ errors: errors.array() });
  }else{
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      Project.create({
        name: req.body.name,
        score: req.body.score,
        durationInDays: req.body.durationInDays,
        bugsCount: req.body.bugsCount,
        madeDadeline: req.body.madeDadeline,
        userId: req.body.userId,
      })
        .then((Project) => {
          res.status(200).send({ Project });
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
    }
  });
}
};

exports.getProjectById = (req, res, next) => {

  const userId = req.user.userId;

  Project.findAll({ where: { userId } })
    .then((Project) => {
      res.status(200).send(Project);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
