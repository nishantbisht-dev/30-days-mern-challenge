const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify({
        mes: "Welcome to my Day 1 MERN Challenge API"
    }))
  }

  else if (req.url === '/about') {
    res.writeHead(200, {
        "content-type": "application/json"
    })
    res.end(JSON.stringify({
        project: "30 Days MERN Challenge",
        author: "Nishant Bisht"
    }))
  }
  else {
    res.writeHead(404,
        {
            "content-type": "application/json"
        }
    )
    res.end(JSON.stringify({
        error: "Route not found"
    }))
  }
});

server.listen(5000, () => {
    console.log("Server running on port 5000")
})