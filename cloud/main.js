/*
var client = require('cloud/MailModule.js');
client.initialize(process.env.MAILGUN_DOMAIN, process.env.MAILGUN_API_KEY);
*/
/*
Parse.Cloud.define('hello', function(req, res) {
Mailgun.sendEmail({
    to: process.env.TESTMAIL,
    from: process.env.MAILGUN_SMTP_LOGIN,
    subject: "Hello from Cloud Code!",
    text: "Using Parse and Mailgun is great!"
}, {
    success: function(httpResponse) {
        console.log(httpResponse);
        res.success("Email sent!");
    },
    error: function(httpResponse) {
       console.error(httpResponse);
       res.error("Uh oh, something went wrong");
    }
});
});
*/
Parse.Cloud.define("sendMail", function(request, response) {
 
  Parse.Cloud.httpRequest({
        method: "POST",
        url: "https://api:" + process.env.MAILGUN_API_KEY + "@api.mailgun.net/v2/" + process.env.MAILGUN_DOMAIN + "/messages",
        body: { 
      to: process.env.TESTMAIL, 
      from: process.env.MAILGUN_SMTP_LOGIN, 
      subject: "Hello from Cloud Code!", 
      text: "Using Parse and Mailgun is great!" 
      
      },success: function(httpResponse) {
        response(Email Sent!);
      },
      error: function(httpResponse) {
        response('Request failed with response code ' + httpResponse.status)
      }
      });
});

