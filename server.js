//Dependencies
const express = require("express");
const exphbs = require("express-handlebars");

//Instance of express
const app = express();
//Create PORT
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Boilerplate for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Get routes
require(".//routes/api-routes")(app);

//Start server
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
