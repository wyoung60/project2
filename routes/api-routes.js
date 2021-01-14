// const Resolution = require("../models/resolution");
const db = require("../models");
const passport = require("../config/passport");
const resolution = require("../models/resolution");
const e = require("express");

//Routes
module.exports = (app) => {
  //Opening route
  app.get("/", (req, res) => {
    res.render("index");
  });

  //Route to add new resolution
  app.get("/mind", (req, res) => {
    res.render("newResolutionMind");
  });

  app.get("/body", (req, res) => {
    res.render("newResolutionBody");
  });

  app.get("/knowledge", (req, res) => {
    res.render("newResolutionKnowledge");
  });

  app.get("/view", (req, res) => {
    const resolutionArray = [];
    db.resolution.findAll({}).then((results) => {
      results.forEach((element) => {
        resolutionArray.push(element.dataValues);
      });

      db.Goals.findAll({}).then((results) => {
        const goalsArray = [];
        results.forEach((element) => {
          goalsArray.push(element.dataValues);
        });
        resolutionArray.forEach((element) => {
          element.goals = [];
          goalsArray.forEach((item) => {
            if (element.id === item.resolutionID) {
              element.goals.push(item);
            }
          });
        });
        const hbsObject = {
          resolution: resolutionArray,
        };
        res.render("viewAll", hbsObject);
      });
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
      .create({
        title: req.body.title,
        mind: req.body.mind,
        body: req.body.body,
        knowledge: req.body.knowledge,
      })
      .then((results) => res.json(results));
  });

  app.post("/api/goal", (req, res) => {
    db.Goals.create({
      goal: req.body.goal,
      resolutionID: req.body.resolution,
    }).then((results) => {
      res.json(results);
    });
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
