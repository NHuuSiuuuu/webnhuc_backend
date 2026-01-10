const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes/index.route");

// cors: tức là thằng fontend là backend khác port bẫn được gọi
const cors = require("cors");
// Cấu hình env
dotenv.config();

const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;

// Sử dụng cors
app.use(cors());

// Kết nối mongoose
const database = require("./config/database");
database.connectMongoose();
app.use(bodyParser.json());
routes(app);
app.listen(port, () => {
  console.log("Server running in port", port);
});
