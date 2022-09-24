const express = require("express");
const admin = require("firebase-admin");
const jsonwebtoken = require("jsonwebtoken");
const secret = require("./secret.json");
const { JsonWebTokenError } = require("jsonwebtoken");

const serviceAccount = require("./reactadvance-16897-firebase-adminsdk-zna92-7c1d14aa91.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  database:
    "http://reactadvance-16897-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const router = express.Router();

const db = admin.database();
const ref = db.ref("/");

const getData = () => {
  ref.once("value", (data) => {
    return data.val();
  });
};
router.post("/account", async (req, res) => {
  const result = await getData();
  res.send(result);
});

router.post("/account/signup", async (req, res) => {
  const accountRef = ref.child("Account");
  accountRef.push(req.body);

  res.sendStatus(200).json({ result: "suscess" });
});

router.post(`/account`, async (req, res) => {
    console.log("TYPE OF SECRETE", typeof secret);
    // Di len firebase realtime database
    const data = await getData();
    // Tim kiem trong object Account
    const accountList = Object.values(data.val().Account);
    // Co ton tai username = req.body.username && password = req.body.password
    const body = req.body;
  
    const result = accountList.some(
      (item) => item.username == body.username && item.password == body.password
    );
    console.log("result", result);
    result
      ? res.status(200).json({
          token: jsonwebtoken.sign({ username: body.username }, secret.value),
        })
      : res.status(401).json({
          result: "Failed",
        });
  });

module.exports = router;
