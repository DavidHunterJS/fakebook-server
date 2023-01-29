const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// DATABASE
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("⚡Connected to Database ⚡"))
  .catch((err) => console.log("Error connecting to Database", err));

// PORT
const PORT = process.env.PORT || 8000;
// SERVER
app.listen(8000, () => {
  console.log(`⚡Server is running on port ${PORT} ⚡`);
});
