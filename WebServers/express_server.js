const express = require("express");

const app = express();

const friends = [
  {
    id: 0,
    name: "Issac Newton",
  },
  {
    id: 1,
    name: "Albert Einstein",
  },
  {
    id: 2,
    name: "Nikola Tesla",
  },
  {
    id: 3,
    name: "Thomas Edison",
  },
];

app.use((req, res, next) => {
  const startDate = Date.now();
  next();
  const time = Date.now() - startDate;
  console.log(`${req.method} ${req.url} ${time}ms`);
});

app.use(express.json());

app.post("/friends", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Missing friend name!",
    });
  }
  const friend = {
    id: friends.length,
    name: req.body.name,
  };
  friends.push(friend);
  res.json(friends);
});

app.get("/friends", (req, res) => {
  res.json(friends);
});

app.get("/friends/:id", (req, res) => {
  const id = +req.params.id;
  const friend = friends[id];
  if (friend) {
    res.json(friend);
  } else {
    res.status(404).json({
      error: "Not Found!",
    });
  }
});

app.listen(3000, () => {
  console.log("Listenning on port 3000...");
});
