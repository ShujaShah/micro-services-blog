const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

//Route for getting the comments
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

//Route for posting a comment
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  //check to see if there is already a comment, if not then return the empty array
  const comments = commentsByPostId[req.params.id] || [];
  //create a comment
  comments.push({
    id: commentId,
    content,
    status: "pending",
  });
  commentsByPostId[req.params.id] = comments;

  //send an event to event bus of comment creation
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

//code to receive an event
app.post("/events", async (req, res) => {
  console.log("Received Event:", req.body.type);

  const { type, data } = req.body;

  //check to see if the comment is moderated
  if (type === "CommentModerated") {
    //find the comment and update its status
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }
  res.status({});
});

app.listen(4001, () => {
  console.log("App is listening on Port 4001 😄");
});
