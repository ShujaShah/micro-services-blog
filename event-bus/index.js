const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

//listen to the incoming events
app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  // Incoming event sent to posts
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  //Incomming event sent to comments
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  //Incomming event sent to query service
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  //Incomming event sent to moderation service
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

//retrieve all the events
app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on Port 4005 😊");
});
