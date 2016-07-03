var Mailgun = require('mailgun');
Mailgun.initialize(process.env.MAILGUN_DOMAIN , process.env.MAILGUN_API_KEY);

Parse.Cloud.define('hello', function(req, res) {
res.success('Hello ! Cloud Code Work Fine, mailgun domain: '+ process.env.MAILGUN_DOMAIN + 'api key: '+  process.env.MAILGUN_API_KEY  +  'from: ' +  process.env.TESTMAIL + 'to:  ' + process.env.MAILGUN_SMTP_LOGIN);
});


