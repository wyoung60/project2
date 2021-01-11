//Dependencies
const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require(".//routes/api-routes")(app);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
