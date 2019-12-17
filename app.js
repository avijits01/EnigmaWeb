$(document).ready(function() {
  //HIDING HIDDEN FIELDS
  $("#emailAddress").hide();
  $("#phone").hide();
  $("#longAnswer").hide();
  $("#fullName").hide();

  //CHECKING LOCAL STORAGE FOR SUCCESSFUL FORM SUBMISSIONS
  if (typeof Storage !== "undefined") {
    if (localStorage.getItem("submitted") == "TRUE") {
      showLoader();
      showSuccess();
      return;
    }
  }
});

var formSubmitted = false;

form = document.querySelector("form");
form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (formSubmitted) return;

  if (typeof Storage !== "undefined") {
    if (localStorage.getItem("submitted") == "TRUE") {
      formSubmitted = true;
      //FORM WAS SUCCESSFULLY SUBMITTED
      showLoader();
      showSuccess();
      return;
    }
  }

  if (
    $("#emailAddress").value ||
    $("#phone").value ||
    $("#longAnswer").value ||
    $("#fullName").value
  )
    return;

  var elements = document.querySelectorAll(
    "input:not(:disabled):not([readonly]):not([type=hidden])" +
      ",select:not(:disabled):not([readonly])" +
      ",textarea:not(:disabled):not([readonly])"
  );

  var formData = {};

  for (var i = 0; i < elements.length; i++) {
    formData[elements[i].name] = elements[i].value;
  }

  formSubmitted = true;
  console.log("SUBMITTING FORM.....");
  showLoader();

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
  var warning = json["error"];
  if (warning == "Form Submitted") {
    formSubmitted = true;
    document.getElementById("error").style.color = "lightgreen";
    showSuccess();
    resetForm();
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      localStorage.setItem("submitted", "TRUE");
    }
  } else {
    formSubmitted = false;
    showError();

    showCountdownTimer(timeLeft = 10); // Function from Loader.js

    setTimeout(() => {
      hideLoader();
    }, 10000);
  }

  document.getElementById("error").innerHTML = warning;
}

function resetForm() {
  document.getElementById("form").reset();
}
