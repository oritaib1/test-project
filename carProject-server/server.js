const express = require("express");
require('dotenv').config()
const bodyParser = require("body-parser");
const cors = require('cors');

const User = require("./Models/Users");
const Project = require("./Models/Project");

const app = express();
const userRoutes = require('./Routes/UserRouting');
const ProjectRouter = require('./Routes/ProjectRouting')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
next();
});

app.use('/user', userRoutes);
app.use('/project', ProjectRouter)
app.get("/", (req, res) => {
  res
    .status(200)
    .send('hello');
});

app.post("/api/users", (req, res) => {
  const user = req.body;
  console.log(user);
  res
    .status(200)
    .send("User added successfully " + user.name + " " + user.lastname);
});


User.hasMany(Project);
Project.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.sync()
Project.sync()
.then(result=>{
    // console.log(result[0])
    app.listen(process.env.PORT || 3000, function (err) {
      if (err) console.log("Error in server setup");
      console.log(`Server listening on Port${process.env.PORT}`);
    });
  });    

