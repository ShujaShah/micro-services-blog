const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

//Route to get all the posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

//Route to create a post
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  //adding a new key
  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("App is listening on Port 4000 😊");
});
