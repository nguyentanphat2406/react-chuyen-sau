const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;


app.get("/", (req, res) => {
  res.send('thuc hien phep tinh cong, tru, nhan, chia')
});

// GET/cong
app.get("/cong", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  const result = Number(a) + Number(b);

  res.send(JSON.stringify(result));
});

// GET/tru
app.get("/tru", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  const result = Number(a) - Number(b);

  res.send(JSON.stringify(result));
});

// GET/nhan
app.get("/nhan", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  const result = Number(a) * Number(b);

  res.send(JSON.stringify(result));
});

// GET/chia
app.get("/chia", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  let result;

  if (Number(b) === 0) result = " error message “Lỗi chia 0";
  else result = Number(a) / Number(b);

  res.send(JSON.stringify(result));
});

// GET/chia du
app.get("/chia-du", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  let result;

  if (Number(b) === 0) result = " error message “Lỗi chia 0";
  else result = Number(a) % Number(b);

  res.send(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
