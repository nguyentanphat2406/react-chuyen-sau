const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

// app.use(morgan("combined"));

app.get("/cong", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  const result = Number(a) + Number(b);

  res.send(JSON.stringify(result));
});

app.get("/tru", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  const result = Number(a) - Number(b);

  res.send(JSON.stringify(result));
});

app.get("/nhan", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  const result = Number(a) * Number(b);

  res.send(JSON.stringify(result));
});

app.get("/chia", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  let result;

  if (Number(b) === 0) result = " error message “Lỗi chia 0";
  else result = Number(a) / Number(b);

  res.send(JSON.stringify(result));
});

app.get("/chia-du", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  let result;

  if (Number(b) === 0) result = " error message “Lỗi chia 0";
  else result = Number(a) % Number(b);

  res.send(JSON.stringify(result));
});

app.get("/binh-phuong", (req, res) => {
  const a = req.query.a;

  const result = Number(a) * Number(a);

  res.send(JSON.stringify(result));
});

app.get("/gia-thua", (req, res) => {
  const a = req.query.a;

  function result(a) {
    let acc = 1;
    for (let i = 1; i <= a; i++) {
      acc *= i;
    }
    return acc;
  }

  res.send(JSON.stringify(result(a)));
});

app.get("/uoc-chung-lon-nhat", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  function GCD(a, b) {
    let gcd = 1;
    for (let i = 1; (i <= a) & (i <= b); i++) {
      if (a % i === 0 && b % i === 0) gcd = i;
    }
    return gcd;
  }

  //   cach 2
  function GCD2(a, b) {
    if (a === b) return a;
    if (a > b) GCD2(a - b, b);
    else GCD2(a, b - a);
  }

  res.send(JSON.stringify(GCD(a, b)));
});

app.get("/boi-chung-nho-nhat", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  function GCD(a, b) {
    let gcd = 1;
    for (let i = 1; (i <= a) & (i <= b); i++) {
      if (a % i === 0 && b % i === 0) gcd = i;
    }
    return gcd;
  }

  function LCM(a, b) {
    return (a * b) / GCD(a, b);
  }

  res.send(JSON.stringify(LCM(a, b)));
});

app.get("/so-nguyen-to", (req, res) => {
  const a = req.query.a;
  let count = 0;

  for (let i = 1; i < a; i++) {
    if (a % i === 0) count += 1;
  }

  const result = count > 1 ? false : true;

  res.send(JSON.stringify(result));
});

app.get("/so-hoan-hao", (req, res) => {
  const a = req.query.a;
  let sum = 0;

  for (let i = 1; i < a; i++) {
    if (a % i === 0) sum += i;
  }

  const result = sum == a ? true : false;

  res.send(JSON.stringify(result));
});

app.get("/hoan-vi", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  const result = {a: b, b: a}

  res.send(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
