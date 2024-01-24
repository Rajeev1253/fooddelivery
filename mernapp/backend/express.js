// const express = require('express')
// const mongoose=require('mongoose')
// const app = express()
// const port =3000
// const connectToMongoDB = require("./db")
// connectToMongoDB();
// app.use(express.json())
// app.use('/api',require('./routes/createuser'))
// app.get('/', (req, res) => {
// });

// app.post("/api/createuser",(req, res)=>{

// })

const express = require("express");
const app = express();
let port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use("/api", require("./routes/displayData.js"));
mongoose
  .connect(
    "mongodb+srv://user2000:test1234@cluster0.np8uxuu.mongodb.net/gofoodmern?retryWrites=true&w=majority"
  )
  .then(async () => {
    const fetchData = await mongoose.connection.db.collection("foodItem");
    const data = await fetchData.find({}).toArray();
    global.food_Item = data;
    const fetchData2 = await mongoose.connection.db.collection("foodCategory");
    const data2 = await fetchData2.find({}).toArray();
    global.food_Category = data2;
    console.log(data2);
    console.log("win");
  })
  .catch(() => console.log("failed"));

let user_schema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  location: {
    type: String,
  },
});

const model_users = mongoose.model("user_data", user_schema);
app.use(bodyParser.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send("hello");
});

app.get("/fooditems", async (req, res) => {
  const fetchData = await mongoose.connection.db.collection("foodItem");
  console.log(fetchData);
  res.send(fetchData);
});

app.post("/signup", async (req, res) => {
  let password2 = String(req.body.password);
  const salt = await bcrypt.genSalt(10);
  const secpassword = await bcrypt.hash(password2, salt);
  const user = new model_users({
    name: req.body.name,
    email: req.body.email,
    password: secpassword,
    location: req.body.location,
  });

  user
    .save()
    .then(() => {
      console.log("saved");
      res.send("done");
    })
    .catch(() => {
      console.log("error");
    });
});
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await model_users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const pwdCompare = await bcrypt.compare(req.body.password, user.password);

    if (!pwdCompare) {
      res.status(200).send("win");
    } else {
      res.status(400).send("fail");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
