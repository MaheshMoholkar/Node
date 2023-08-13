const http = require("http");

const PORT = 3000;

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        id: 1,
        name: "Issac Newton",
      })
    );
  } else {
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
  }
});

server.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
