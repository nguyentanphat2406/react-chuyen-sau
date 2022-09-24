const express = require("express");
const router = express.Router();

const data = require("./data.json");

// 1: Liệt kê danh sách sinh viên
router.get("/", (req, res) => {
  res.send(data.categories.filter((item) => item.electric));
});

//3. thêm sản phẩm electric
router.post("/", (req, res) => {
  const body = req.body;
  const addElectric = data.categories.find((item) => {
    return item.electric.push([...body, {name: 'name', price: 2406}]);
  });

  res.send(addElectric);
});

//5. cập nhật thông tin 1 sản phẩm electric
router.patch("/", (req, res) => {
  const body = req.body;
  const updateElectric = data.categories.find((item) => {
    return item.electric.push([{...body}]);
  });

  res.send(updateElectric);
});

// 7. xóa sản phẩm
router.delete("/", (req, res) => {
  const name = req.query.name;
  const deleteElectric = data.categories.find((item) => {
    return item.electric.filter(itemName => itemName.name != name);
  });

  res.send(deleteElectric);
});


module.exports = router;
