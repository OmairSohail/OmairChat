// PACKAGES
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// CONFIG FILE
dotenv.config({ path: "./config/config.env" });

// INITIALIZE APP
const app = express();

// Connecting To Database
connectDb();

// Parsing Json (Express-BodyParser)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initializing Express Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Initializing Passport js
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require("./config/passport")(passport);

// Set Global User Variable
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

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
// -- Error Routes
app.use("/error", require("./routes/errors"));

// Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// PORT AND SERVER LISTENING
const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} on http://localhost:${port}`
  )
);
