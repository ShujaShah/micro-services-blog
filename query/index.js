const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

//get all the posts as well as comments
app.get("/posts", (req, res) => {
  res.send(posts);
});

//Receive the events from the event bus
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  //handle the event of post created
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  //handle the event of comment created
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on Port 4002 😀");
});
