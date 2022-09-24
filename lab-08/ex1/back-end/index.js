const express = require("express");

const app = express();

const port = 5000;

const hostName = "localhost";

const jsonwebtoken = require("jsonwebtoken");
const { expressjwt: jwt } = require("express-jwt");
const account = require('./account')
const bodyParser = require("body-parser");
const cors = require("cors");
const secret = require("./secret.json")

app.use(cors());
app.use(bodyParser.json());
app.use(account)
app.use(jwt({ secret: secret.value, algorithms: ["HS256"] }));


const { database } = require("firebase-admin");
const admin = require("firebase-admin")

token: jsonwebtoken.sign({user: 'an', jwtSecret})



app.listen(port, () => {
  console.log("server is runnimg at http://" + hostName + ":" + port);
});
