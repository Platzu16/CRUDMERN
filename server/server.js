const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./User");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/crudapp")
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  UserModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

app.post("/create", (req, res) => {
  console.log("req", req.body);
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
