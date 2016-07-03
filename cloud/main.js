var Mailgun = require('mailgun');
Mailgun.initialize('appa9a584ad97074d5ab260c6e53ec0ae06.mailgun.org' , 'key-b92dcf8f127906f7582e26419a3d6606');

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


