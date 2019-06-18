// install npm install node-schedule

const Nexmo = require('nexmo')

const nexmo = new Nexmo({
  apiKey: "5ae8faa2",
  apiSecret: "O7gIZrtj1GsltaeL"
})

// fetch data from the google calendar
var origin=where;
var destination=where;
// put time in the following format 
// replace the result. ex yyyy=1997, MM=12.
var year=yyyy;
var month=MM;
var day=dd;
var hour=hh;
var minuteInCalendar=mm;
var inputTime=5;
// add 2 more minutes to their preferred TimeRanges, 
// becuase people need time to react when they see the message
var perferredTimeBefore=inputTime+5;
var minute=0;

// calculate the execution time
if((minuteInCalendar-perferredTimeBefore-travalTime)<0){
    minute=60+(minuteInCalendar-perferredTimeBefore);
}else if((minuteInCalendar-perferredTimeBefore-travalTime)>=0){
    minute=minuteInCalendar-perferredTimeBefor;
}
// get the actual time that we will execute the time
var date = new Date(year, month, day, hour, minute,0);

var linkInText="https://www.google.com/maps/dir/?api=1&origin="+origin+"&destination="+destination;

// this is our default virtual number
const from = '13852403539';
// set message receiver
var to = '19083916750';
// make the text dynamic
const text = 'Hello, this is Dear Time. Thanks for subscribing us. We will help you to get to your place on time. Click here to see the route: '+linkInText;


// send text
function sendMessage(){ 
    
nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})

 };


// route calculation
$.ajax({
    url:"https://maps.googleapis.com/maps/api/directions/json?origin="+origin+"&destination="+destination+"&key=AIzaSyBN7LY1mgo8xNyiqviHoMbxTnrT4whKLXM",
    method:"GET"
}).then(function(response){
    
    var travalTime=response.routes[0].legs[0].duration.text;


// Node.js schedule time to run function
    var schedule = require('node-schedule');
 
     schedule.scheduleJob(date, function(){
        
        //  execute the sendMessage function when it hist time
        sendMessage();
        });

})
