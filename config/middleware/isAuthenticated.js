module.exports = (req, res, next) => {
  // If the user is logged in the request will go through
  if (req.user) {
    return next();
  }
  // if the user is not logged in it will shoot them to the log in page
  return res.redirect("/login");
};
