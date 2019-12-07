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

  document.getElementById("submit").addEventListener("click", function() {
    this.disabled = true;
  });
  console.log(formData);

  fetch("http://localhost:3000/submit", {
    method: "post",
    body: formData
  })
    .then(res => res.json()) //response type
    .then(data => console.log(data))//log the data;
    .catch(err => console.log(err)); 
}

/*$(document).ready(function() {
    $('#form').submit(function() {
      $(this).ajaxSubmit({
        error: function(xhr) {
          status('Error: ' + xhr.status);
        },
       success: function(response) {
        console.log(response);
       }
      });
      //Very important line, it disable the page refresh.
      return false;
    });
  });
*/
