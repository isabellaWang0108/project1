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

$(document).ready(function() {
    //SEARCH BAR
    $("#siteSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".eventsInDate tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

});