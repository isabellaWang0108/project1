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

//sign up on click
$("#signUp").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        uid = user.user.uid;
        database.ref('users/').push({
            uid: user.user.uid,
            name: $("#name").val(),
            number: $("#number").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            prefT: $("#preferredTime").val(),
            text: true,
            call: false
                //insert google calender stuff to save
        });
    }).then(function() {
        redirectIn();
    }).catch(function(error) {
        alert("Failed to sign up...");
    });
});

$("#signIn").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        redirectIn();
    }).catch(function(error) {
        alert("Failed to sign in. Please check credentials or sign up!");
    });
});

$("#signOut").on("click", function() {
    firebase.auth().signOut();
    redirectOut();
});

function redirectOut() {
    $("body").html(`<div class="background"></div>

    <h2 class="animated slideInUp fast">Welcome Back : )</h2>

    <input type="email" class="animated fadeIn slow" id="email" placeholder="Your Email">
    <input type="password" class="animated fadeIn slow" id="password" placeholder="password">
    <p class="signUp">Don't have account? <a href="signUp.html"> Sign up</a></p>

    <!-- This is where you sync the Google Doc -->
    <button class="calendars" id="googleCalendar">sign in</button>
    <!-- After users sync the calendar, button Ready to go shows up -->
    <!-- <button id="signUp">Ready to Go!</button> -->

    </section>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-database.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-auth.js"></script>
    <script src="../scripts/account.js"></script>
`);
}

function redirectIn(user) {
    $("body").html(`
    <h2 class="innerPage">Your Events</h2>
    <label><img src="../search.png"></label>
    <input type="search" id="siteSearch" placeholder="Search event by name or date">
    <div id="container-for-content">
    
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-database.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-auth.js"></script>
    <script src="../scripts/inner.js"></script>
    `);
}