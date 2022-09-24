const express = require("express");
const router = express.Router();

const students = require("./students.json");

let studentList = students;

// 1: Liệt kê danh sách sinh viên
router.get("/", (req, res) => {
  res.send(studentList);
});

// 2: Liệt kê danh sách sinh viên & điểm trung bình
const studentInfowithAverageScore = () => {
  for (let i = 0; i < studentList.students.length; i++) {
    const arrScore = studentList.students[i].scores.map((item) => item.grade);
    const averageScore = arrScore.reduce((a, b) => a + b, 0) / arrScore.length;
    studentList.students[i].averageScore = averageScore;
  }
};

router.get("/all-info", (req, res) => {
  studentInfowithAverageScore();
  res.send(studentList);
});


// 3: sinh viên có điểm trung bình cao nhất
router.get("/highest-average", (req, res) => {
  studentInfowithAverageScore();
  const arrAvScore = studentList.students.map((item) => item.averageScore);
  const max = Math.max(...arrAvScore);

  let result = [];

  for (let i = 0; i < arrAvScore.length; i++) {
    if (arrAvScore[i] === max) {
      result.push(studentList.students[i]);
    }
  }

  res.send(result);
});

// 4; sinh viên có điểm trung bình thấp nhất
router.get("/lowest-average", (req, res) => {
  studentInfowithAverageScore();
  const arrAvScore = studentList.students.map((item) => item.averageScore);
  const min = Math.min(...arrAvScore);

  console.log(arrAvScore);
  console.log(min);

  let result = [];

  for (let i = 0; i < arrAvScore.length; i++) {
    if (arrAvScore[i] === min) {
      result.push(studentList.students[i]);
    }
  }

  res.send(result);
});

// 5: tìm sinh viên Sid
router.get("/:sid", (req, res) => {
  const sid = req.params.sid;
  const result = studentList.students.filter((item) => item.sid == sid);

  res.send(result);
});

// 6: xóa thông tin sinh viên
router.delete("/:sid", (req, res) => {
  const sid = req.params.sid;
  const result = studentList.students.filter((item) => item.sid != sid);
  res.send(result);
});

// 7: cập nhật thông tin
router.put("/:sid", (req, res) => {
  const sid = req.body.sid;
  const body = req.body;

  const result = studentList.students.map((item) => {
    if ((item.sid = sid)) return { ...item, ...body };
    return item;
  });

  res.send(result);
});

// Thêm sinh viên
router.post("/:sid", (req, res) => {
    const body = req.body;
    const sidInArr = studentList.students[studentList.students.length - 1]
    studentList.students.push({...body, sid: ++sidInArr})
    
    res.send(studentList);
  });

module.exports = router;
