const Resolution = require("../models/resolution");

//Routes
module.exports = (app) => {
  app.get("/", (req, res) => {
    Resolution.findAll({}).then((results) => {
      const resolutionArray = [];
      results.forEach((element) => {
        resolutionArray.push(element.dataValues);
      });
      const hbsObject = {
        resolution: resolutionArray,
      };

      res.render("index", hbsObject);
    });
  });
  //Post route needed
  app.post("/api/resolution", (req, res) => {
    Resolution.create({ title: req.body.title }).then((results) =>
      res.json(results)
    );
  });
};
