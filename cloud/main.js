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
      },
      success: function(httpResponse) {
        var patt1 = /[0-9]+%/g;
        response.success(httpResponse.text.match(patt1));
    },
    error: function(httpResponse) {
        var failer = new Array();
        failer[0] = "fail";
        failer[1] = httpResponse.status;
        response.success(failer);
    }
      });
});

