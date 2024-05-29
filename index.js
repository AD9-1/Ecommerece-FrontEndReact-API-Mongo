require("dotenv").config();
const port = process.env.PORT;

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const i_Routes = require("./routes/itemRoutes");
const u_Routes = require("./routes/userRoutes");
const { MulterError } = require("multer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", i_Routes);
app.use("/", u_Routes);
app.use("/upload/images", express.static(__dirname + "/upload/images"));

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof MulterError)
      res.status(403).json({ message: "There is MulterSpecific Error" });
    else {
      res.status(500).json({ message: err });
    }
  }
});
app.get("/", (_req, res) => {
  res.json({ message: "express server is running" });
});
app.listen(port, () => console.log(`Server running on port ${port}`));
