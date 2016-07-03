//var mailgun = require('cloud/MailModule.js');
//mailgun.initialize(process.env.MAILGUN_DOMAIN, process.env.MAILGUN_API_KEY);
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
  mailgun.sendEmail({ 
      to: process.env.TESTMAIL, 
      from: process.env.MAILGUN_SMTP_LOGIN, 
      subject: "Hello from Cloud Code!", 
      text: "Using Parse and Mailgun is great!" 
      
  }).then(function(httpResponse) {
    response.success("Email sent!");
  }, function(httpResponse) {
    console.error(httpResponse);
    response.error("Uh oh, something went wrong");
  });
});

