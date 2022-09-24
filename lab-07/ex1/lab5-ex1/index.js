const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./lab5-ex1-firebase-adminsdk-c8el3-c1b53e6986.json");
const app = express();
const port = 3002;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lab5-ex1-default-rtdb.firebaseio.com",
});

const db = admin.database();
const ref = db.ref("/");

const getDatabase = (res) => {
  ref.once("value", (data) => {
    res.send(data.val())
  });
};

app.get("database", (req, res) => {
  getDatabase(res)
})

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

const object1 = ref.child("products");
app.post("/", (req, res) => {
  object1.set({
    "objectID 1": {
      brand: "Samsung 1",
      category: "mobile 1",
      name: "Galaxy S 21 1",
      price: 10001,
    },
  });
  ref.once("value", (data) => {
    res.send(data.val());
  });
});

const object2 = ref.child("products");
app.post("/", (req, res) => {
  object2.set({
    "objectID 2": {
      brand: "Samsung 2",
      category: "mobile 2",
      name: "Galaxy S 21 2",
      price: 10002,
    },
  });
  ref.once("value", (data) => {
    res.send(data.val());
  });
});

const usersRef = ref.child("products");
app.get("/update", (req, res) => {
  usersRef.update(object1, object2);
});

app.post("/", async (req, res) => {
  const product = ref.child("products")
  const data = await getDatabase(res);
  productList = data.val().product
  product.set({
    ...productList,
    [productList.length] : {
      "objectID 2": {
        brand: "Samsung 2",
        category: "mobile 2",
        name: "Galaxy S 21 2",
        price: 10002,
      },
    }
  })
});

app.post("/product", async(req, res) => {
  const productRef = ref.child("product")
  productRef.push({"objectID 1": {
    brand: "Samsung 1",
    category: "mobile 1",
    name: "Galaxy S 11 1",
    price: 10001,
  }})
  const newResult = await getDatabase(res)
  res.send(newResult.val())
})

app.put("/product", async(req, res) => {
  const productRef = ref.child("product")
  productRef.push({"objectID 3": {
    brand: "Samsung 3",
    category: "mobile 3",
    name: "Galaxy S 33 3",
    price: 30003,
  }})
  const newResult = await getDatabase(res)
  res.send(newResult.val())
})

app.delete("/product", async(req, res) => {
  const productRef = ref.child("product")
  productRef.child("").remove()
  const newResult = await getDatabase(res)
  res.send(newResult.val())
})

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
