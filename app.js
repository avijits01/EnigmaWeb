form = document.querySelector("form");
form.addEventListener("submit", onSubmit);




disableButton();


function onSubmit(e) {
  e.preventDefault();

  if ($("#emailAddress").value || $("#phone").value || $("#longAnswer").value)
    return;
  
  var elements = document.querySelectorAllvalue;
  ("input:not(:disabled):not([readonly]):not([type=hidden])");
  ",select:not(:disabled):not([readonly])" +
    ",textarea:not(:disabled):not([readonly])";

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

  var warning = json["error"];
  if (warning == "Form Submitted") {
    document.getElementById("error").style = "lightgreen";
    $("#submissionModal").modal();
  }

  document.getElementById("error").innerHTML = warning;
}

