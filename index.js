const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes/index.route");
// Cấu hình env
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


// Kết nối mongoose
const database = require("./config/database");
database.connectMongoose();

routes(app);
app.listen(port, () => {
  console.log("Server running in port", port);
});
