var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1} 
    slides[slideIndex-1].style.display = "block"; 
    setTimeout(showSlides, 5000); // Change image every 2 seconds
}


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
    var firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("X");
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
  var trainMinsAway = moment.unix(firstTrain).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainTime = moment().diff(moment.unix(firstTrain, "X"), "minutes");
  console.log(trainTime);




  //math to determine arrival time and minutes that the train will arrive
    // present
    var current = moment();
    
    // read that you need to subtract 1 year to make sure it comes before current time
    var trainTime = moment(firstTrain,"HH:mm").subtract(1, "years");

    // time difference between present and train time in minutes
    var difference = moment().diff(moment(trainTime), "minutes");

    // divide the time difference by the frequency, this number is important in determining when the next train is coming
    var difference2 = difference % frequency;

    // minutes for the train to arrive
    var minutes = frequency - difference2;

    // time the train arrives
    var arrival = moment().add(minutes, "minutes")
    
    var trainMinsAway2 = moment.unix(arrival).format("HH:mm");
    console.log(trainMinsAway2);
    console.log(current);
    console.log(trainTime);
    console.log(difference);
    console.log(difference2);
    console.log(minutes);
    console.log(arrival);


// Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" + frequency + "</td><td>" + trainMinsAway2 + "</td><td>" + minutes + "</td></td>");

});
