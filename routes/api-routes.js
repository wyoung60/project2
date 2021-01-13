const Resolution = require("../models/resolution");
const db = require("../models");
const passport = require("../config/passport");

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

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });


  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

// logout route
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

// might need this for incorrect user inputs or sending back user data client side
  // app.get("/api/user_data", function(req, res) {
  //   if (!req.user) {
  //     res.json({});
  //   } else {
  //     res.json({
  //       email: req.user.email,
  //       id: req.user.id
  //     });
  //   }
  // });

};
