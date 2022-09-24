const express = require("express");
const morgan = require("morgan");
var bodyParser = require('body-parser')
const app = express();
const port = 3002;

const students  = require("./students")

app.use(bodyParser.json())

app.use("/students" ,students)


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
