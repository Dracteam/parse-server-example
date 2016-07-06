Parse.Cloud.define("downloaditems", function(request, response){
   var items;
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
                itemsArray.push(object.get('title'));
                
                /*for (var i = 0; i < paramsitemsArray.length; i++) {
                        var objectDictionary = paramsitemsArray[i];
                        if(object.get('title') === objectDictionary.get('title')){
                        //object.increment("sold", + objectDictionary.get('quantity'));
                        itemsArray.push(object);
                        }   
                } */
            }
            for (var i = 0; i < paramsitemsArray.length; i++) {
                        var objectDictionary = paramsitemsArray[i];
                        itemsArray.push( objectDictionary.get('title'))
                        //object.increment("sold", + objectDictionary.get('quantity'));
                       
            }
            items = itemsArray;    
            promise.resolve(itemsArray);
             
         }
     }).then(function() {
         response.success(items);
     }, function(error) {
        response.error(error);
      });
});        


Parse.Cloud.define("purchase", function(request, response) {
    
  Parse.Cloud.useMasterKey();
  var items,item, order;
    
 // Query of items
  Parse.Promise.as().then(function(){
                          
    var itemsQuery = new Parse.Query("Items");                      
    return itemsQuery.find().then(null, function(error){
    return Parse.Promise.error('1 - Sorry, an error occurred.');                          
    });                      
  }).then(function(results){
    if (!results) {
      return Parse.Promise.error('2 - Sorry, an error occurred.');
    } 
    var itemsArray = [];  
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      var paramsitemsArray = request.params.itemsarray;
       for (var i = 0; i < paramsitemsArray.length; i++) {
           var objectDictionary = paramsitemsArray[i];
           if(object.get('title') === objectDictionary.get('title')){
               object.increment("sold", + objectDictionary.get('quantity'));
               itemsArray.push(object);
           }   
       } 
    }
    // save all the newly created objects
    return Parse.Object.saveAll(itemsArray).then(null, function(error){
         return Parse.Promise.error('3 - Sorry, an error occurred.');
    }); 
      
  }).then(function(results) {
    
    // We have items left! Let's create our order item before 
    // charging the credit card (just to be safe).
    order = new Parse.Object('Order');
    order.set('name', request.params.name);
    order.set('user', request.params.user);
    order.set('items', request.params.items);
    order.set('payment_method', request.payment_method);
    order.set('amount', request.params.amount);
    
    // Create new order
    return order.save().then(null, function(error) {
      // This would be a good place to replenish the quantity we've removed.
      // We've ommited this step in this app.
      console.log('Creating order object failed. Error: ' + error);
      return Parse.Promise.error('4 - An error has occurred');
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
            return Parse.Promise.error('5 - An error has occurred'); 
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




Parse.Cloud.define("sendMail", function(request, response) {
 
  Parse.Cloud.httpRequest({
        method: "POST",
        url: "https://api:" + process.env.MAILGUN_API_KEY + "@api.mailgun.net/v2/" + process.env.MAILGUN_DOMAIN + "/messages",
        body: { 
            to: request.params.mail , 
            from: 'Your Order <' + process.env.MAILGUN_SMTP_LOGIN +'>', 
            subject: "Thank You for your Order!", 
            html: request.params.html
            },
      success: function(httpResponse) {
        response.success("Email sent!");
    },
    error: function(httpResponse) {
        response.error("Uh oh, something went wrong");
    }
      });
});

