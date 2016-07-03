Parse.Cloud.define('hello', function(req, res) {
res.success('Hello ! Cloud Code Work Fine, mailgun domain:'+ process.env.MAILGUN_DOMAIN + 'from' +  process.env.TESTMAIL + 'from' + process.env.MAILGUN_SMTP_LOGIN);
});


