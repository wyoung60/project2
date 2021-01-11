const Resolution = require("../models/resolution");

module.exports = (app) => {
  app.get("/", (req, res) => {
    Resolution.findAll({}).then((results) => res.json(results));
  });
};
