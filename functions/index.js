const functions = require("firebase-functions");

exports.returnMessage = functions.https.onCall((data, context) => {
  return {
    output: "the firebase function has been run",
  };
});
