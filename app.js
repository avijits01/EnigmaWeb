form = document.querySelector("form");
form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  var elements = document.querySelectorAll(
    "input:not(:disabled):not([readonly]):not([type=hidden])" +
      ",select:not(:disabled):not([readonly])" +
      ",textarea:not(:disabled):not([readonly])"
  );

  var formData = {};

  for (var i = 0; i < elements.length; i++) {
    formData[elements[i].name] = elements[i].value;
  }

  // document.getElementById("submit").addEventListener("click", function() {
  //   this.disabled = true;
  // });

  fetch("https://enigmadev.herokuapp.com/submit", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(formData)
  })
    .then(res => res.json()) //response type
    .then(data => {
      console.log(data);
      handleData(data);
    }) //log the data;
    .catch(err => console.log(err));
}

function handleData(json) {
  console.log("Reached warning function");

  var warning = "";

  if (json["captcha"] == false) {
    if (json["error"] == "captcha_empty") {
      warning = "Verification missing.";
      document.getElementById("captcha").innerHTML = warning;
    } else {
      warning = "Try verifing again";
      document.getElementById("captcha").innerHTML = warning;
    }
  } else {
    if (json["error"] == "captcha_verification_failure") {
      warning = "Captcha verification failed. Try again or reload the page.";
      document.getElementById("captcha").innerHTML = warning;
    } else if (json["error"] == "") {
      warning = "Captcha verification successful.";
      document.getElementById("captcha").style.color = "lightgreen";
    }
  }
  document.getElementById("captcha").innerHTML = warning;

  if (json["mail"] == false) {
    if (json["error"] == "mail_failed") {
      warning =
        "Something went wrong while submitting the form. Try again and if this still fails, contact developers.";
      document.getElementById("error").innerHTML = warning;
    }
  } else {
    if (json["mail"] == true && json["success"] == true) {
      warning = "SUBMITTED. Please feel free to navigate somewhere else.";
      document.getElementById("error").innerHTML = warning;
      document.getElementById("error").style.color = "lightgreen";
    }
  }
}
