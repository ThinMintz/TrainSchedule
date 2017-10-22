  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDeuc8kpEVM5tMDnlBR88f-vqVcIfy5Nlk",
    authDomain: "train-schedule-32aad.firebaseapp.com",
    databaseURL: "https://train-schedule-32aad.firebaseio.com",
    projectId: "train-schedule-32aad",
    storageBucket: "train-schedule-32aad.appspot.com",
    messagingSenderId: "484720524807"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  //button to add employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destinationName = $("#destination-name").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "MM:mm").format("X");
    var frequency = $("#frequency-name").val().trim();

//creates local "temporary" object for holding employee data
    var newTrain = {
      train: trainName,
      destination: destinationName,
      firstTrain: firstTrain,
      frequency: frequency
    };
//uploads employee data to the database
    database.ref().push(newTrain);

// Logs everything to console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
  //clears all of the text-boxes
  $("#train-name").val("");
  $("#destination-name").val("");
  $("#first-train").val("");
  $("#frequency-name").val("");
  });

//creates firebase event for adding trains to schedule in the rows when the user adds a train
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().train;
  var destinationName = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

//train info
  console.log(trainName);
  console.log(destinationName);
  console.log(firstTrain);
  console.log(frequency);

  // Prettify the train mins away
  var trainMinsAway = moment.unix(firstTrain).format("MM:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainTime = moment().diff(moment.unix(firstTrain, "X"), "minutes");
  console.log(trainTime);

// Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</tr></td>" + destinationName + "</tr><td>" + trainMinsAway + "</tr><td>" + frequency + "</tr></td>");

});
