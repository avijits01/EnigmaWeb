  const firebase = require("firebase");

  var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APPLICATION_ID,
    measurementId: process.env.MEASUREMENT_ID
  };
  
  firebase.initializeApp(firebaseConfig);


//recieve master process
process.on("message", async (data) => {

    var status = "FALSE";
    //long running task at https://enigmadev.herokuapp.com/registrations.html
    const db = firebase.firestore();
  
    console.log("UPLOADING....");
    console.log(data);
  
    db
      .collection("RECRUITMENT")
      .doc(data.email)
      .set(data)
      .then(() => {
        console.log("DOCUMENT SENT SUCCESSFULLY.");
        status = "TRUE";
        process.send(status);
      })
      .catch(err => {
        console.log("ERROR IN SENDING DOCUMENT" + err);
        process.send(status);
      });
  
});
