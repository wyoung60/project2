// const Resolution = require("../models/resolution");
const db = require("../models");
const passport = require("../config/passport");

//Routes
module.exports = (app) => {
  //Opening route
  app.get("/", (req, res) => {
    res.render("index");
  });

  //Route to add new resolution
  app.get("/new", (req, res) => {
    // db.resolution.findAll({}).then((results) => {
    //   const resolutionArray = [];
    //   results.forEach((element) => {
    //     resolutionArray.push(element.dataValues);
    //   });
    //   const hbsObject = {
    //     resolution: resolutionArray,
    //   };
    res.render("newResolution" /*hbsObject*/);
    // });
  });

  app.get("/view", (req, res) => {
    db.resolution.findAll({}).then((results) => {
      const resolutionArray = [];
      results.forEach((element) => {
        resolutionArray.push(element.dataValues);
      });
      const hbsObject = {
        resolution: resolutionArray,
      };
      res.render("viewAll", hbsObject);
    });
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  //Route to post new resolution
  app.post("/api/resolution", (req, res) => {
    db.resolution
      .create({ title: req.body.title })
      .then((results) => res.json(results));
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // logout route
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // might need this for incorrect user inputs or sending back user data client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
};
