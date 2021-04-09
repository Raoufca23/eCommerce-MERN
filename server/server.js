require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const corse = require("cors");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

// connection to the database
// `mongodb+srv://cluster0.nb0qo.mongodb.net/${process.env.DB_NAME}`,
// ?retryWrites=true&w=majority

mongoose
  // .connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
    .connect(`mongodb+srv://cluster0.0nire.mongodb.net/${process.env.DB_NAME}`, {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected succesfully");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  corse({
    origin: ["http://localhost:3000", "http://localhost:2000"],
    credentials: true,
  })
);
app.use(
  "/public",
  express.static(path.join(__dirname, "app/uploads/product/"))
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello to my application",
  });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/cart.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
