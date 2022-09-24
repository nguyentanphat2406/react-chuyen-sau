const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.get(bodyParser.json());
const data = require("./data.json");

let products = data;

//1. liệt kê danh sách data
app.get("/products", (req, res) => {
  res.send(products);
});

//2. trả về object theo id
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const result = products.data.filter((item) => item.id == id);
  res.send(result);
});

// 3. trả về object đầu tiên trong data.json
app.get("/first", (req, res) => {
  res.send(products.data[0]);
});

// 4. trả về object cuối cùng trong data.json
app.get("/last", (req, res) => {
  res.send(products.data[products.data.length - 1]);
});

// 5. trả về json ở vị trí truyền value
app.get("/at", (req, res) => {
  const value = req.query.value;
  console.log(value);

  const result = products.data.filter((item) => item.id == value);
  res.send(result);
});

// 6. price lớn nhất
app.get("/maxPrice", (req, res) => {
  const arrAvScore = products.data.map((item) => item.price);
  const max = Math.max(...arrAvScore);

  let result = [];

  for (let i = 0; i < arrAvScore.length; i++) {
    if (arrAvScore[i] === max) {
      result.push(products.data[i]);
    }
  }

  res.send(result);
});

// 6. price nhỏ nhất
app.get("/minPrice", (req, res) => {
  const arrAvScore = products.data.map((item) => item.price);
  const min = Math.min(...arrAvScore);

  let result = [];

  for (let i = 0; i < arrAvScore.length; i++) {
    if (arrAvScore[i] === min) {
      result.push(products.data[i]);
    }
  }

  res.send(result);
});

// 7. xóa object json ở vị trí id
app.delete("/id", (req, res) => {
  const id = req.query.id;

  const result = products.data.filter((item) => item.id != id);
  res.send(result);
});

// 7. xóa object json ở vị trí price
app.delete("/price", (req, res) => {
  const price = req.query.price;

  const result = products.data.filter((item) => item.price != price);
  res.send(result);
});

// 7. xóa object json ở vị trí name
app.delete("/price", (req, res) => {
  const name = req.query.name;

  const result = products.data.filter((item) => item.name != name);
  res.send(result);
});

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
