

Parse.Cloud.define('hello', function(req, res) {
var Mailgun = require('mailgun');
Mailgun.initialize(process.env.MAILGUN_DOMAIN , process.env.MAILGUN_API_KEY);
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


