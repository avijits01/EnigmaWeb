$(document).ready(function() {
  $("#emailAddress").hide();
  $("#phone").hide();
  $("#longAnswer").hide();
  $("#fullName").hide();

  if (localStorage.getItem("submitted") == "TRUE") {
    alert("You have already submitted the form. You cannot make any changes now");
  }

});

var formSubmitted = false;

form = document.querySelector("form");
form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (formSubmitted) return;

  if (localStorage.getItem("submitted") == "TRUE") {
    formSubmitted = true;
    //FORM WAS SUCCESSFULLY SUBMITTED
    $("#submissionModal").modal();
    return;
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

  var warning = json["error"];
  if (warning == "Form Submitted") {
    formSubmitted = true;
    document.getElementById("error").style.color = "lightgreen";
    $("#submissionModal").modal();

    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      localStorage.setItem("submitted", "TRUE");
    }
  } else {
    formSubmitted = false;
  }

  document.getElementById("error").innerHTML = warning;
}
