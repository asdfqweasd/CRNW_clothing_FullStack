const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/productsRoute");
const usersRouter = require("./routes/usersRoute");
const app = express();

// resolve request body into JSON, and define verify middleware for keeping raw request body for Stripe event construction
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true }));

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
app.use("/products", productsRouter);
app.use("/users", usersRouter);

// Start the server
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
