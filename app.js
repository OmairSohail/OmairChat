// PACKAGES
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// CONFIG FILE
dotenv.config("./config/config.env");

// INITIALIZE APP
const app = express();

// Connecting To Database
connectDb();

// STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

// VIEW ENGINE
app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", ".hbs");

// Routes Middlewares
// -- Homepage
app.use("/", require("./routes/index"));
// -- Auth Routes
app.use("/auth", require("./routes/auth"));

// PORT AND SERVER LISTENING
const port = process.env.PORT || 3000;

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} on http://localhost:${port}`
  )
);
