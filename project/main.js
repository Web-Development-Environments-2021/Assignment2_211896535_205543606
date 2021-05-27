//#region global imports
const DButils = require("./routes/utils/DButils");
const axios = require("axios");
const bcrypt = require("bcryptjs");
require("dotenv").config();
//#endregion

//#region express configures
var express = require("express");
var path = require("path");
const session = require("client-sessions");
var logger = require("morgan");
var cors = require("cors");

//#create an express object
var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 24 * 60 * 60 * 1000, // expired after 20 sec
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
    cookie: {
      httpOnly: false,
    },
    //the session will be extended by activeDuration milliseconds
  })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

// middleware to serve all the needed static files under the dist directory - loaded from the index.html file
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("dist"));

// handle GET method for API visualization
app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

const port = process.env.PORT || "3000";

// create all the routes
const auth = require("./routes/auth");
const users = require("./routes/users");
const league = require("./routes/league");
const teams = require("./routes/teams");
const players = require("./routes/players");
const coaches = require("./routes/coaches");
const matches = require("./routes/matches");
const referees = require("./routes/referees");

//#endregion

//#region cookie middleware
app.use(function (req, res, next) {
  if (req.session && req.session.username) {
    DButils.execQuery("SELECT username FROM users")
      .then((users) => {
        if (users.find((x) => x.username === req.session.username)) {
          req.username = req.session.username;
        }
        next();
      })
      .catch((error) => next());
  } else {
    next();
  }
});
//#endregion

// ----> For cheking that our server is alive
app.get("/alive", (req, res) => res.send("I'm alive"));



// Routings
app.use("/players",players)
app.use("/users", users);
app.use("/league", league);
app.use("/teams", teams);
app.use("/coaches",coaches);
app.use("/matches",matches);
app.use("/referees",referees);
app.use(auth);

// ---> for displaying errors
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

// ---> Server init
const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

// process.on("SIGINT", function () {
//   if (server) {
//     server.close(() => console.log("server closed"));
//   }
// });
