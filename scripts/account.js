var firebaseConfig = {
    apiKey: "AIzaSyBN7LY1mgo8xNyiqviHoMbxTnrT4whKLXM",
    authDomain: "project-1-b691a.firebaseapp.com",
    databaseURL: "https://project-1-b691a.firebaseio.com",
    projectId: "project-1-b691a",
    storageBucket: "project-1-b691a.appspot.com",
    messagingSenderId: "904494310957",
    appId: "1:904494310957:web:f844b97c354d9a11"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var uid;
var user;

$("#next").on("click",function(){
    $("#allTheSignUp").css("z-index","5");
})
// phone number formatting

$(document).ready(function(){
    $("#number").inputmask({"mask": "(999) 999-9999"}); 
  });

//sign up on click
$("#googleCalendar").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        alert("Failed to sign up...");

        // let user know what's the problem
        $(".errorMessage").text(error);
    });
});


$("#signOut").on("click", function() {
    firebase.auth().signOut().catch(function(error) {
        alert("failed to sign out")
    });

});

//DONT TOUCH THIS FUNCTION, ITS BUILT ON STICKS T^T
var trueOnce = false;
firebase.auth().onAuthStateChanged(person => {
    console.log(window.location);
    //SIGN UP AND AUTO LOG IN
    if (person && window.location.href.includes("signUp")) {
        var call = false;
        if ($('#callChecked').is(':checked')) {
            call = true;
        }
        var pref = $("#preferredTime").val();
        if (pref === '')
            pref = 15
        database.ref('users/').push({
            uid: person.uid,
            name: $("#name").val(),
            number: $("#number").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            prefT: pref,
            text: true,
            call: call
                //insert google calender stuff to save
        });
        // window.location = 'innerPage.html';
    }
    //STOP INFINITE LOOP
    else if (window.location.href.includes("signUp")) {
        return;
    }
    //SIGNED IN AND ON INNER PAGE
    else if (person && !window.location.href.includes("innerPage")) {
        window.location = 'innerPage.html';
    }
    //POPULATE DATA HERE
    else if (person && !trueOnce) {
        trueOnce = true;
        user = person
        uid = person.uid

    }
    //STOP SIGN OUT INFINITE LOOP
    else if (!window.location.href.includes("signIn")) {
        window.location = 'signIn.html'
    }
});