//Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const db = require("./models");

//Instance of express
const app = express();
//Create PORT
const PORT = process.env.PORT || 8080;

//Make public folder the static folder
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Boilerplate for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//Get routes
require(".//routes/api-routes")(app);

//Start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
