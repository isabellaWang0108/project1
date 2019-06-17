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

//sign up on click
$("#signUp").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        uid = user.user.uid;
        database.ref().push({
            uid: user.user.uid,
            name: $("#name").val(),
            number: $("#number").val(),
            email: $("#email").val(),
            password: $("#password").val()
                //insert google calender stuff to save
        });
    }).then(function() {
        redirect();
    }).catch(function(error) {
        alert("Failed to sign up...");
    });
});

$("#signIn").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        redirect();
    }).catch(function(error) {
        alert("Failed to sign in. Please check credentials or sign up!");
    });

    function redirect(user) {
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
});