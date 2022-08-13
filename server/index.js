const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path')

// routes
const UserRouter = require("./routes/UserRoutes");
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
app.use('/note', NotesRouter);

mongoose
  .connect('mongodb+srv://Vasudevrani:mongoAtlasByVasu@cluster0.saoy6ch.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("app connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})


app.listen(process.env.PORT, () => {
  console.log("server started");
});
