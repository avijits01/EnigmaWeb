const firestore = firebase.firestore();

var submitButton = document.getElementById("submit");

const fname = document.getElementById("name");
const mail = document.getElementById("email");
const regno = document.getElementById("regno");
const preference1 = document.getElementById("preference1");
const preference2 = document.getElementById("preference2");
const paragraph = document.getElementById("situation");

 document
  .getElementById("form")
  .addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  console.log("Form submitted.");
  const fullName = fname.value;
  const emailid = mail.value;
  const registerNo = regno.value;
  const pref1 = preference1.value;
  const pref2 = preference2.value;
  const situation = paragraph.value;
  console.log(fullName);

  if (!fullName) {
    fname.focus();
  } else if (!emailid) {
    mail.focus();
  } else if (!registerNo) {
    regno.focus();
  } else if (!pref1) {
    preference1.focus();
  } else if (!pref2) {
    preference2.focus();
  } else if (!situation || situation == "") {
    paragraph.focus();
  } else {
    console.log("reached function");
    var docRef = firestore.collection("RECRUITMENTS").doc(mail.value);

    docRef
      .set({
        name: fullName,
        email: emailid,
        regNo: registerNo,
        firstPreference: pref1,
        secondPreference: pref2,
        club_contribution: situation
      })
      .then(function() {
        alert(
          "Thanks! We have received the form. You will now be redirected to the Enigma page"
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
