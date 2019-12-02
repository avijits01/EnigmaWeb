var firebaseConfig = {
  apiKey: "AIzaSyC2kf_hhHAx5w6IWsz-AkfcCxm0JwmlJzk",
  authDomain: "theenigmadev.firebaseapp.com",
  databaseURL: "https://theenigmadev.firebaseio.com",
  projectId: "theenigmadev",
  storageBucket: "theenigmadev.appspot.com",
  messagingSenderId: "921345817660",
  appId: "1:921345817660:web:9f9b53dfe2329a327a9739",
  measurementId: "G-B7R1EHRDMD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();

var submitButton = document.getElementById("submit");

const fname = document.getElementById("name");
const mail = document.getElementById("email");
const regno = document.getElementById("regno");
const preference1 = document.getElementById("preference1");
const preference2 = document.getElementById("preference2");
const paragraph = document.getElementById("situation");

submitButton.addEventListener("click", function() {
  console.log("Form submitted.");
  const fullName = fname.value;
  const emailid = mail.value;
  const registerNo = regno.value;
  const pref1 = preference1.value;
  const pref2 = preference2.value;
  const situation = paragraph.value;
  console.log(registerNo+ pref1 + pref2);

  if (!fullName) {
    fname.focus();
  } else if (!emailid) {
    mail.focus();
  } else if (!registerNo) {
    regno.focus();
  } else if (!pref1) {
    pref1.focus();
  } else if (!pref2) {
    pref2.focus();
  } else if (!situation) {
    situation.focus();
  } else {
    uploadToDatabase();
  }
});

function uploadToDatabase() {
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
