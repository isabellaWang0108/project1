// install npm install node-schedule

const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: "5ae8faa2",
    apiSecret: "O7gIZrtj1GsltaeL"
})

// fetch data from the google calendar

var origin = "Disneyland";
var destination = "Universal Studios Hollywood";

var year = 2019;
var month = 06;
var day = 18;
var hour = 14; //military time
var minute = 20;
// add 2 more minutes to their preferred TimeRanges, 
// becuase people need time to react when they see the message
var preferredTimeBefore = 5 + 2; //5 is dynamic
var arrive = 50; // fake data on time it takes to arrive (minutes)
var now = moment(); //exact time right now
var eventTime = moment().year(year).month(month).date(day).hour(hour).minute(minute); // 6/18/2019 11:53am

//calc here
var notificationTime = eventTime.subtract(arrive, "minutes").subtract(preferredTimeBefore, "minutes"); //subracts time it takes to arrive
// get the actual time that we will execute the time AND THIS IS THE TIME U SEND THE TEXT
var timeLeftTillText = notificationTime.diff(now, "seconds") * 100;

setTimeout(function() {
    sendMessage()
}, timeLeftTillText);

// this is our default virtual number
const from = '13852403539';
// set message receiver
var to = '19083916750';
// make the text dynamic

var linkInText = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + destination;
const text = 'Hello, this is Dear Time. Thanks for subscribing us. We will help you to get to your place on time. Click here to see the route: ' + linkInText;


// send text
function sendMessage() {

    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })

};

// route calculation
function route(origin, destination) {
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&key=AIzaSyBN7LY1mgo8xNyiqviHoMbxTnrT4whKLXM",
        method: "GET"
    }).then(function(response) {

        var travalTime = response.routes[0].legs[0].duration.text;


        // Node.js schedule time to run function
        var schedule = require('node-schedule');

        schedule.scheduleJob(date, function() {

            //  execute the sendMessage function when it hist time
            sendMessage();
        });

    })
}
