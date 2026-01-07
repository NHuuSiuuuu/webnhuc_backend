const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

// Cấu hình env
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

mongoose
  .connect(
    "mongodb+srv://nguyenhung2k4gh_db_user:admin@cluster0.sltwzof.mongodb.net/webnhuc"
  )
  .then(() => {
    console.log("Kết nối thành công!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hrj hrj r");
});

app.listen(port, () => {
  console.log("Server running in port", port);
});
