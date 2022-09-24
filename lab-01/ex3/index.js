const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
