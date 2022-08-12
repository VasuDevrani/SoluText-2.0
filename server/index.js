const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// routes
const UserRouter = require("./routes/UserRoutes");
const TransRouter = require('./routes/TransRoutes')
const NotesRouter = require('./routes/NotesRoutes')

dotenv.config();

const app = express();

// middlwares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// routers
app.use('/user', UserRouter);
app.use('/trans', TransRouter);
app.use('/note', NotesRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("app connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
