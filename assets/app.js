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
  
  });