//Dependencies
const express = require("express");

//Instance of express
const app = express();
//Create PORT
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Get routes
require(".//routes/api-routes")(app);

//Add handlebars

//Start server
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
