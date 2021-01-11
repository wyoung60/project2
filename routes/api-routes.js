const Resolution = require("../models/resolution");

//Routes
module.exports = (app) => {
  app.get("/", (req, res) => {
    Resolution.findAll({}).then((results) => res.json(results));
  });
  //Post route needed
};
