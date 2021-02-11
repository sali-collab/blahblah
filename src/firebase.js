// Initialize Firebase
var config = {
  apiKey: 'AIzaSyA6fbkg02RkiDsmli42_mXaVy-qdKrtvms',
  authDomain: 'blah-blah-564407.firebaseapp.com',
  databaseURL: 'https://blah-blah-564407-default-rtdb.firebaseio.com/',
  projectId: 'blah-blah-564407',
  storageBucket: 'blah-blah-564407.appspot.com',
  messagingSenderId: '99095757695',

  // data base connection, for all the info you want to upload
};
var database;
var ref;
var votes = [];
var callbackFn = false;
function initDatabase() {
  firebase.initializeApp(config);
  database = firebase.database();
  ref = database.ref('scores'); // ref is refrence of score inside the database
  ref.on('value', gotData, errData);
}

function errData(err) {
  console.log('Error!');
  console.log(err);
}

function gotData(data) {
  var scores = data.val();
  votes = [];
  if (scores) {
    var keys = Object.keys(scores);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var submittedLocation = scores[k].location;
      var submittedAge = parseInt(scores[k].age);
      var submittedVote = scores[k].vote;

      votes.push({
        location: submittedLocation,
        age: submittedAge,
        vote: submittedVote,
      });
    }
    if (callbackFn) callbackFn(votes);
  }
}

function pushVote(age, location, vote) {
  var data = {
    age: age,
    location: location,
    vote: vote,
  };
  var ref = database.ref('scores');
  ref.push(data);
}

function setCallback(fn) {
  callbackFn = fn;
}

function getVotes() {
  return votes;
}

module.exports = { initDatabase, setCallback, pushVote , getVotes};
