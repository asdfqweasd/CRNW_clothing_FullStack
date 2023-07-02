const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const indexRouter = require("./routes/index");
const hatsRouter = require("./routes/hatRoute");
const usersRouter = require("./routes/usersRoute");
const app = express();

// Connect to your MongoDB database using Mongoose
app.use(cors());
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

app.use("/", indexRouter);
app.use("/hats", hatsRouter);
app.use("/users", usersRouter);

// Start the server
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
