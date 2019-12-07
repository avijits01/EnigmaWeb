const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");
require("dotenv").config();

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname : It will resolve to the project folder.
});

router.get("/about", function(req, res) {
  res.sendFile(path.join(__dirname + "/landing.html"));
});

router.get("/landing", function(req, res) {
  res.sendFile(path.join(__dirname + "/landing.html"));
});

router.get("/registrations", function(req, res) {
  res.sendFile(path.join(__dirname + "/registrations.html"));
});

router.get("/register", function(req, res) {
  res.sendFile(path.join(__dirname + "/registrations.html"));
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());

app.post("/submit", function(req, res) {
  console.log(req.body);

  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if (
    req.body["g-recaptcha-response"] === undefined ||
    req.body["g-recaptcha-response"] === "" ||
    req.body["g-recaptcha-response"] === null
  ) {
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

  var mailOptions = {
    from: "icasapp.team@gmail.com",
    to: "enigmadev.forms@gmail.com",
    subject: "[RECRUITMENT FORM]" + req.body.email + "->" + req.body.name,
    text: JSON.stringify(req.body)
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
app.use(express.static(__dirname + "/"));

app.listen(process.env.PORT || 3000);
