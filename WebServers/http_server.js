const http = require("http");

const PORT = 3000;

const friends = [
  {
    id: 1,
    name: "Issac Newton",
  },
  {
    id: 2,
    name: "Albert Einstein",
  },
  {
    id: 3,
    name: "Nikola Tesla",
  },
  {
    id: 4,
    name: "Thomas Edison",
  },
];

const server = http.createServer();

server.on("request", (req, res) => {
  const items = req.url.split("/");
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      friends.push(JSON.parse(friend));
    });
  } else if (
    req.method === "GET" &&
    items.length === 3 &&
    items[1] === "friends"
  ) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    const index = Number(items[2]);
    res.end(JSON.stringify(friends[index]));
  } else if (items.length === 2 && items[1] === "friends") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(friends));
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
