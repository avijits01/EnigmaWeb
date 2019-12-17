const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");
const helmet = require("helmet");
require("dotenv").config();
app.use(express.static(__dirname + "/"));
app.use(helmet());

app.listen(process.env.PORT || 5000);

// ====================================================================================
// ROUTING GET PATHS  =================================================================
// ====================================================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname : It will resolve to the project folder.
});
app.get("/index", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname : It will resolve to the project folder.
});


app.get("/about", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/landing.html"));
});
app.get("/landing", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/landing.html"));
});
app.get("/enigma", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/landing.html"));
});
app.get("/homepage", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/landing.html"));
});


app.get("/register", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/registrations.html"));
});
app.get("/apply", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/registrations.html"));
});
app.get("/join", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/registrations.html"));
});
app.get("/registration", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/registrations.html"));
});
app.get("/registrations", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/registrations.html"));
});


app.get("/air", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/AiR.html"));
});
app.get("/AiR", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/AiR.html"));
});
app.get("/airesearch", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/AiR.html"));
});
app.get("/sMYaa6yxxhprrLHGGmusscYaa6yxxhprrLHGGmusscYaa6yxxhprrLHGGmusscYaa6yxxhprvLkgb", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/timeline.html"));
});


app.get("/team", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/team.html"));
});


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/404.html"));
});

// ====================================================================================
// ====================================================================================
// ====================================================================================

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());

app.post("/submit", function(req, res) {
  console.log(req.body);

  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.situation ||
    !req.body.regNo ||
    !req.body.phoneNumber
  )
    if (
      req.body["g-recaptcha-response"] === undefined ||
      req.body["g-recaptcha-response"] === "" ||
      req.body["g-recaptcha-response"] === null
    ) {
      // g-recaptcha-response is the key that browser will generate upon form submit.
      // if its blank or null means user has not selected the captcha, so return the error.
      return res.json({
        success: false,
        captcha: false,
        mail: false,
        error: "Captcha was not filled."
      });
    }
  // Put your secret key here.
  var secretKey = process.env.RECAPTCHA;
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    req.body["g-recaptcha-response"] +
    "&remoteip=" +
    req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl, function(error, response, body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if (body.success !== undefined && !body.success) {
      console.log("CAPTCHA SUCCESS?");
    } else {
      return res.json({
        success: false,
        captcha: true,
        mail: false,
        error: "Failed to verify captcha."
      });
    }
  });

  const nodemailer = require("nodemailer");
  console.log("REACHED FUNCTION NODEMAILER");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secureConnection: false,
    auth: {
      user: "icasapp.team@gmail.com",
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mail = JSON.stringify(req.body, null, "\t"); // stringify with tabs inserted at each level
  mail = JSON.stringify(req.body, null, 4); // stringify with 4 spaces at each level

  var mailOptions = {
    from: "icasapp.team@gmail.com",
    to: "enigmadev.forms@gmail.com",
    subject: "[RECRUITMENT FORM]" + req.body.email + "->" + req.body.name,
    text: mail
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        captcha: true,
        mail: true,
        error: "Failed to submit the form."
      });
    } else {
      return res.json({
        success: true,
        captcha: true,
        mail: true,
        error: "Form Submitted"
      });
    }
  });
});

//add the routerlog
