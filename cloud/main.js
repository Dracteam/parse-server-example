var Mailgun = require('mailgun');
Mailgun.initialize(process.env.MAILGUN_DOMAIN, process.env.MAILGUN_API_KEY);

Parse.Cloud.define('sendEmailToUser', function(req, res) {
  mailgun.sendEmail({
    to: "email@example.com",
    from: "Mailgun@CloudCode.com",
    subject: "Hello from Cloud Code!",
    text: "Using Parse and Mailgun is great!"
}, {
    success: function(httpResponse) {
        console.log(httpResponse);
        response.success("Email sent!");
    },
    error: function(httpResponse) {
       console.error(httpResponse);
       response.error("Uh oh, something went wrong");
    }
});
});


