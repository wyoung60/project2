const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

//Routes
module.exports = (app) => {
  //Opening route
  app.get("/", (req, res) => {
    res.render("index", { user: req.user });
  });

  //Route to add new resolution
  app.get("/mind", isAuthenticated, (req, res) => {
    res.render("newResolutionMind", { user: req.user });
  });

  app.get("/body", isAuthenticated, (req, res) => {
    res.render("newResolutionBody", { user: req.user });
  });

  app.get("/knowledge", isAuthenticated, (req, res) => {
    res.render("newResolutionKnowledge", { user: req.user });
  });

  app.get("/view", isAuthenticated, (req, res) => {
    db.Resolution.findAll({
      include: db.Goals,
      where: {
        UserId: req.user.id,
      },
    }).then((results) => {
      const resolutionArray = results.map((resolution) => {
        const goals = resolution.dataValues.Goals.map(
          (goal) => goal.dataValues
        );
        return {
          ...resolution.dataValues,
          goals: goals,
        };
      });
      const hbsObject = {
        resolution: resolutionArray,
        user: req.user,
      };
      res.render("viewAll", hbsObject);
    });
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.post("/login", passport.authenticate("local"), (req, res) => {
    res.redirect("/");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.post("/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        res.render("signup", { error: "Unable to sign up, try again" });
      });
  });

  //Route to post new resolution
  app.post("/api/resolution", isAuthenticated, (req, res) => {
    db.Resolution.create({
      title: req.body.title,
      mind: req.body.mind,
      body: req.body.body,
      knowledge: req.body.knowledge,
      UserId: req.user.id,
    }).then((results) => res.json(results));
  });

  app.post("/api/goal", (req, res) => {
    db.Goals.create({
      goal: req.body.goal,
      ResolutionId: req.body.resolution,
    }).then((results) => {
      res.json(results);
    });
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    req.session.email = req.user.email;
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
