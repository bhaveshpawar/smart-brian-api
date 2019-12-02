const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const app = express();

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

const database = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "root",
    database: "smart-brain"
  }
});

app.use(express.json()); //to parse message body if sent in json form
app.use(cors());
app.get("/", (req, res) => {
  res.send(db.users);
});
app.post("/signin", (req, res) =>
  signin.handleSignin(req, res, database, bcrypt)
);
app.post("/register", (req, res) =>
  register.handleRegister(req, res, database, bcrypt)
);

app.get("/profile/:id", (req, res) =>
  profile.handleProfileGet(req, res, database)
);
app.put("/image", (req, res) => image.handleImage(req, res, database));

app.listen(3001);
