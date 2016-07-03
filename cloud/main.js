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

from='Excited User <postmaster@appa9a584ad97074d5ab260c6e53ec0ae06.mailgun.org>'
*/
Parse.Cloud.define("sendMail", function(request, response) {
 
  Parse.Cloud.httpRequest({
        method: "POST",
        url: "https://api:" + process.env.MAILGUN_API_KEY + "@api.mailgun.net/v2/" + process.env.MAILGUN_DOMAIN + "/messages",
        body: { 
            to: process.env.TESTMAIL, 
            from: 'Your Order <' + process.env.MAILGUN_SMTP_LOGIN +'>', 
            subject: "Hello from Cloud Code!", 
            text: "Using Parse and Mailgun is great!",
            html: ' <table style="border-spacing: 0px; height: 639px;" width="587"><tbody><tr><td colspan="3" bgcolor="#c6e9ed" height="100px"><h1 align="center"><span style="color: #ffffff;">YOUR ORDER</span></h1>&nbsp;</td></tr><tr bgcolor="#c6e9ed"><td width="20px">&nbsp;</td><td><table style="border-spacing: 0px; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px; border: 1px solid white; height: 100%; width: 100%;" bgcolor="#ffffff"><tbody><tr style="border-bottom: 1pt solid black; height: 50px; color: #959899; border-top-left-radius: 10px; border-top-right-radius: 10px;" align="center" bgcolor="f2f2f2 "><td><strong><strong>&nbsp;PRODUCT</strong></strong></td><td><strong>&nbsp;QUANTITY</strong></td><td><strong>&nbsp;PRICE</strong></td></tr><tr style="border-bottom: 1pt solid black; height: 60px; color: #000;"><td>&nbsp;Bocconcino Cow 100g</td><td align="center">&nbsp;4</td><td>&nbsp;36 Dhs</td></tr><tr style="border-bottom: 1pt solid black; height: 60px; color: #000;"><td>&nbsp;Ricotta Buffalo 250g</td><td align="center">&nbsp;4</td><td>&nbsp;80Dhs</td></tr><tr style="border-bottom: 1pt solid black; color: #959899;"><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr style="border-bottom: 1pt solid black; height: 60px; color: #000;"><td>&nbsp;</td><td align="center">&nbsp;TOTAL</td><td>&nbsp;116 Dhs</td></tr></tbody></table>&nbsp;</td><td bgcolor="#c6e9ed" width="20px">&nbsp;</td></tr></tbody></table><p>&nbsp;</p>'

            },
      success: function(httpResponse) {
        response.success("Email sent!");
    },
    error: function(httpResponse) {
        response.error("Uh oh, something went wrong");
    }
      });
});

