const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT;

// http://localhost:3000
app.get("/", (req, res) => {
  res.send("example text");
});

app.listen(port, () => {
  console.log("Serves is running on port: ", port);
});
