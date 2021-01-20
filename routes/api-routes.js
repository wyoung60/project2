const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const passwordStrength = require("check-password-strength");

//Routes
module.exports = (app) => {
  //Opening route
  app.get("/", (req, res) => {
    res.render("index");
  });

  //Route to home page when user is authenticated
  app.get("/home", isAuthenticated, (req, res) => {
    db.User.findOne({ where: { email: req.user.email } }).then(() => {
      //Renders home page and passes user object for if statement in handlebars file
      res.render("index", { user: req.user });
    });
  });

  //Routes to add new resolution and verify user is logged in
  app.get("/mind", isAuthenticated, (req, res) => {
    //Render mind page
    res.render("newResolutionMind", { user: req.user });
  });

  app.get("/body", isAuthenticated, (req, res) => {
    //Render body page
    res.render("newResolutionBody", { user: req.user });
  });

  app.get("/knowledge", isAuthenticated, (req, res) => {
    //Render knowledge page
    res.render("newResolutionKnowledge", { user: req.user });
  });

  //Route to get all resolutions and verify user is logged in
  app.get("/view", isAuthenticated, (req, res) => {
    //Gets all resolution and goal values linking the tables.  Also only pulling values for unique user.
    db.Resolution.findAll({
      include: db.Goals,
      where: {
        UserId: req.user.id,
      },
    }).then((results) => {
      //Creates an array pulling resolution values
      const resolutionArray = results.map((resolution) => {
        //Creates an array pulling goal values linked to resolution id
        const goals = resolution.dataValues.Goals.map(
          (goal) => goal.dataValues
        );
        return {
          //Returns object to resolution array with resolution data and linked goals
          ...resolution.dataValues,
          goals: goals,
        };
      });
      //Creates the object for handlebars
      const hbsObject = {
        resolution: resolutionArray,
        user: req.user,
      };
      //Renders view all page
      res.render("viewAll", hbsObject);
    });
  });

  //Gets login page
  app.get("/login", (req, res) => {
    res.render("login");
  });

  //Post to verify user is in user table
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (!user) res.render("login", { error: info.message });
      else {
        req.logIn(user, (err) => {
          //If present returns to home page or displays errors
          if (err) {
            return next(err);
          }
          return res.redirect("/home");
        });
      }
    })(req, res, next);
  });

  //Get for signup page
  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  //Post to signup that add user info to users table
  app.post("/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    })
      .then(() => {
        //Redirects to login
        res.redirect("/login");
      })
      .catch((err) => {
        //If failure renders signup page with error message
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

  //Route to create new goal on goals table
  app.post("/api/goal", (req, res) => {
    db.Goals.create({
      goal: req.body.goal,
      ResolutionId: req.body.resolution,
    }).then((results) => {
      res.json(results);
    });
  });

  //Route to update goal table's boolean value if completed
  app.post("/api/update", (req, res) => {
    db.Goals.update(
      {
        completed: true,
      },
      { where: { id: req.body.id } }
    ).then(() => {
      res.end();
    });
  });

  //Verifies user login
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

  app.post("/api/checkpassword", (req, res) => {
    if (req.body.password === "") {
      res.json({
        strength: "Weak",
      });
    } else {
      res.json({
        strength: passwordStrength(req.body.password).value,
      });
    }
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

  //Deletes values from resolutions page and its linked goals
  app.delete("/api/delete", isAuthenticated, (req, res) => {
    //Starts with goals with correct resolution id
    db.Goals.destroy({
      where: { ResolutionId: req.body.id },
    }).then(() => {
      //Then deletes resolution with selected id
      db.Resolution.destroy({
        where: { id: req.body.id },
      }).then(() => {
        //Reloads view page
        res.redirect("/view");
      });
    });
  });
};
