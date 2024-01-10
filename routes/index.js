var express = require("express");
var router = express.Router();
const userModel = require("./users");
const contactModel = require("./contact");
const passport = require("passport");
const localStrategy = require("passport-local");

// Authenticating the user by using local strategy
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render("index", { user });
});

//authentication
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", function (req, res, next) {
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
  });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/");
    });
  });
});

//login page
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",

    //flash message active
    failureFlash: true,
  }),
  function (req, res, next) {}
);

//contact us page
router.get("/contact", function (req, res, next) {
  const successMessage = req.flash("success");
  const errorMessage = req.flash("error");
  res.render("contact", { successMessage, errorMessage });
});

//logout page
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});
router.get("/login", function (req, res, next) {
  res.render("login", { error: req.flash("error") });
});

router.post("/contact", async function (req, res, next) {
  try {
    const contactData = new contactModel({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      message: req.body.message,
    });
    const contact = await contactData.save();
    req.flash(
      "success",
      "Your message has been submitted. We will get back to you shortly."
    );
    res.redirect("/contact");
  } catch (error) {
    req.flash("error", "Failed to save data.");

    res.redirect("/contact");
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
