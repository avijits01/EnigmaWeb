const firestore = firebase.firestore();

var submitButton = document.getElementById("submit");

const fname = document.querySelector("#name");
const mail = document.querySelector("#email");
const regno = document.querySelector("#regno");
const preference1 = document.querySelector("#preference1");
const preference2 = document.querySelector("#preference2");
const paragraph = document.querySelector("#situation");

submitButton.addEventListener("click", function() {
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
  } else if (!situation || situation=="") {
      paragraph.focus();
  } else {
    console.log("reached function");
    var docRef = firestore.collection("FORM_SUBMISSION_DATA").doc(mail.value);

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
});
