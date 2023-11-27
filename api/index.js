const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
// ini
const jsonParser = bodyParser.json();
//itu
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const port = 3000;

app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.post("/login", (req, res) => {
  const username = "alfian";
  const password = "1234";

  // Simulate database validation
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      status: "error",
      message: "Username and password are required.",
    });
  }

  // Check if username is valid
  if (req.body.username !== username) {
    return res.status(401).json({
      status: "error",
      message: "Username not found.",
    });
  }

  // Check if password is valid
  if (req.body.password !== password) {
    return res.status(401).json({
      status: "error",
      message: "Incorrect password.",
    });
  }

  // Return success
  res.json({ status: "success" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
