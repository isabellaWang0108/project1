var firebaseConfig = {
    apiKey: "AIzaSyDcMYNBSTQCeXwIlPH7cyqKXpi7A0nKGhY",
    authDomain: "deartime-1560536040733.firebaseapp.com",
    databaseURL: "https://deartime-1560536040733.firebaseio.com",
    projectId: "deartime-1560536040733",
    storageBucket: "deartime-1560536040733.appspot.com",
    messagingSenderId: "89333287478",
    appId: "1:89333287478:web:f1fdb86f738768e1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//sign up on click
$("#googleCalendar").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        //insert any error alerts here later!
    });

});

$("#signIn").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
});