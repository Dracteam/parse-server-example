
Parse.Cloud.define("downloaditems", function(request, response){
   var items, order, user;
   var query = new Parse.Query("Items");
 
     var promise = new Parse.Promise();
 
     query.find().then(function(results) {
         if (results.length == 0)
         {
             promise.resolve("No items found!");
         }
         else
         {
            var itemsArray = [];  
            var paramsitemsArray = request.params.itemsarray;
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                for (var r = 0; r < paramsitemsArray.length; r++) {
                        if(object.get('title') === paramsitemsArray[r].title){
                        object.increment("sold", + paramsitemsArray[r].quantity);
                        itemsArray.push(object);
                        }   
                } 
            }
            return Parse.Object.saveAll(itemsArray).then(null, function(error){
            return promise.error('3 - Sorry, an error occurred.');
            });
             
         }
     }).then(function(results) {
    
    // We have items left! Let's create our order item before 
    // charging the credit card (just to be safe).
    var itemQuery = new Parse.Query('User');
    itemQuery.equalTo('objectId', request.params.user);
    
    return itemQuery.first().then(null, function(error) {
      return Parse.Promise.error('4 - An error has occurred');
    });

  }).then(function(result) {
    
    user = result;
    // We have items left! Let's create our order item before 
    // charging the credit card (just to be safe).
    order = new Parse.Object('Orders');
    order.set('name', request.params.name);
    order.set("client", user);
    order.set('items', request.params.items);
    order.set('payment_method', request.params.payment_method);
    order.set('amount', request.params.amount);
    
    // Create new order
    return order.save().then(null, function(error) {
      // This would be a good place to replenish the quantity we've removed.
      // We've ommited this step in this app.
      console.log('Creating order object failed. Error: ' + error);
      return Parse.Promise.error('5 - An error has occurred');
    });

  }).then(function(order) {     

        Parse.Cloud.httpRequest({
        method: "POST",
        url: "https://api:" + process.env.MAILGUN_API_KEY + "@api.mailgun.net/v2/" + process.env.MAILGUN_DOMAIN + "/messages",
        body: { 
            to: request.params.mail , 
            from: 'Your Order <' + process.env.MAILGUN_SMTP_LOGIN +'>', 
            subject: "Thank You for your Order!", 
            html: request.params.html
            }}).then(null, function(error) {
            return Parse.Promise.error('6 - An error has occurred'); 
        });
  }).then(function() {
    // And we're done!
    response.success('Success');

  // Any promise that throws an error will propagate to this handler.
  // We use it to return the error from our Cloud Function using the 
  // message we individually crafted based on the failure above.
  }, function(error) {
    response.error(error);
  });
});   
