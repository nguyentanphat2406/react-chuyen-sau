const express = require("express");
const router = express.Router();

const data = require("./data.json");

let foods = data;

// 2: Liệt kê danh sách sinh viên
router.get("/", (req, res) => {
  res.send(foods.categories.filter(item => item.foods));
});

//4. thêm sản phẩm electric
router.post("/", (req, res) => {
  const body = req.body;
  const addFood = data.categories.find((item) => {
    return item.addFood.push([...body, {name: 'name', price: 2406}]);
  });

  res.send(addFood);
});

//6. cập nhật thông tin 1 sản phẩm foods
router.patch("/", (req, res) => {
  const body = req.body;
  const updateFoods = data.categories.find((item) => {
    return item.foods.push([{...body}]);
  });

  res.send(updateFoods);
});

// 8. xóa sản phẩm
router.delete("/", (req, res) => {
  const name = req.query.name;
  const deleteFoods = data.categories.find((item) => {
    return item.foods.filter(itemName => itemName.name != name);
  });

  res.send(deleteFoods);
});

module.exports = router;
