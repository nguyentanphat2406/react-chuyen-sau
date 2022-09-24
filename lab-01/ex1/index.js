const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;


app.get("/", (req, res) => {
  res.send('Hello World!!!')
});

app.post("/", (req, res) => {
  res.send('Hello POST method')
});

app.put("/", (req, res) => {
  res.send('“Hello PUT method')
});

app.delete("/", (req, res) => {
  res.send('Hello DELETE method')
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
