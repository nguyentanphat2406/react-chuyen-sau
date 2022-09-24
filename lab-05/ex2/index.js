const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./lab5-ex2-firebase-adminsdk-ozbkg-b7394dc86f.json");
const app = express();
const port = 3002;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lab5-ex2-default-rtdb.firebaseio.com"
});

const db = admin.database();
const ref = db.ref("/");

app.get("/", (req, res) => {
  ref.once("value", (data) => {
    res.send(data.val());
  });
});

ref.on("child_added", (data, prevChildkey) => {
  const newData = data.val();
  console.log("new data", newData);
  console.log("Author: " + newData.author);
  console.log("Title: " + newData.title);
  console.log("Previous Post Id: " + prevChildkey);
});

const object1 = ref.child("categories");
app.post("/", (req, res) => {
  object1.set({
    "objectID 1": {
      name: "Galaxy S 21 1",
    },
  });
  ref.once("value", (data) => {
    res.send(data.val());
  });
});

const usersRef = ref.child('categories');
app.get("/update", (req, res) => {

  usersRef.update(object1);
})

app.post("/", async (req, res) => {
  const categories = ref.child("categories")
  const data = await getDatabase(res);
  categories = data.val().categories
  categories.set({
    ...categories,
    [categories.length] : {
      "objectID 2": {
        name: "Galaxy S 21 2",
      },
    }
  })
});

app.post("/categories", async(req, res) => {
  const categoriesRef = ref.child("categories")
  categoriesRef.push({"objectID 1": {
    name: "Galaxy 3",
  }})
  const newResult = await getDatabase(res)
  res.send(newResult.val())
})

app.put("/categories", async(req, res) => {
  const categoriesRef = ref.child("categories")
  categoriesRef.push({"objectID 3": {
    name: "Galaxy S 33 3",
  }})
  const newResult = await getDatabase(res)
  res.send(newResult.val())
})

app.delete("/categories", async(req, res) => {
  const categoriesRef = ref.child("categories")
  categoriesRef.child("").remove()
  const newResult = await getDatabase(res)
  res.send(newResult.val())
})

const object2 = ref.child("brands");
app.post("/", (req, res) => {
  object2.set({
    "objectID 1": {
      name: "Galaxy S 21 1",
    },
  });
  ref.once("value", (data) => {
    res.send(data.val());
  });
});

const usersRef2 = ref.child('brands');
app.get("/update", (req, res) => {

  usersRef2.update(object1);
})

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
