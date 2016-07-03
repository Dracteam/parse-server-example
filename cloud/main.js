Parse.Cloud.define('hello', function(req, res) {
res.success('Hello ! Cloud Code Work Fine, mailgun domain:' + process.env.MAILGUN_DOMAIN + 'mailgun api key' + process.env.MAILGUN_API_KEY + 'to:'  process.env.TESTMAIL + 'from' + process.env.MAILGUN_SMTP_LOGIN);
});


