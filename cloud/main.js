var Mailgun = require('mailgun');
Mailgun.initialize(process.env.MAILGUN_DOMAIN, process.env.MAILGUN_API_KEY);

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


