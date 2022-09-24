const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3001;
const data = require("./data.json");

const electric = require("./electric");
const food = require("./food");

app.use(bodyParser.json());

app.use("/electric", electric);
app.use("/food", food);

//9. thêm sản phẩm categories
app.post("/addCategories", (req, res) => {
  const body = req.body;
  data.categories.push({ ...body });

  res.send(studentList);
});

//10 . xóa sản phẩm categories
app.delete("/deleteCategories", (req, res) => {
  const product = req.query.product;
  const result = data.categories.filter((item) => item == product);
  
  res.send(result);
});

app.put("/putCategories", (req, res) => {
  const product = req.query.product;
  const body = req.body;

  const result = data.categories.map((item) => {
    if ((item = product)) return { ...item, ...body };
    return item;
  });

  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
