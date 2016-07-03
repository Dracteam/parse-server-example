var Mailgun = require('mailgun');
Mailgun.initialize(process.env.MAILGUN_DOMAIN, process.env.MAILGUN_API_KEY);

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define("sendEmailToUser", function(request, response) {
Mailgun.sendEmail({
to: process.env.TESTMAIL,
from: process.env.MAILGUN_SMTP_LOGIN,
subject: 'Your order for a Parse ' + request.params.itemName + ' was successful!',
text: body
}).then(function(response) {
response.success("Email sent!");
}, function(response) {
console.error(response);
response.error("Uh oh, something went wrong");
});
});
