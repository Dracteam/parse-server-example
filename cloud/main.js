Parse.Cloud.define("downloaditems", function(request, response){
  var items, order, user, ordercount, general;
  Parse.Promise.as().then(function() {
    // Fetch current User
   var itemQuery = new Parse.Query('User');
   itemQuery.equalTo('objectId', request.params.user);
   return itemQuery.first().then(null, function(error) {
      return Parse.Promise.error('Error - User Not Found');
   });

  
  }).then(function(resultuser) {
    // Create the User Object
    user = resultuser;
    // The User exists, so get the order number
    var itemQuery = new Parse.Query('General');
   itemQuery.equalTo('objectId', "e50PztuHWk");
   return itemQuery.first().then(null, function(error) {
      return Parse.Promise.error('Error - Order Count Not Found');
   });

  }).then(function(result) {
   
    // Increment Orders
    general = result;
    ordercount = result.get('total_orders'); 
    general.increment('total_orders', +1);
    // Create new order
    return general.save().then(null, function(error) {
      console.log('Creating order object failed. Error: ' + error);
      return Parse.Promise.error('Error - Order not registered, Please contact Us');
    });

  
  }).then(function(result) {
   // Proceed to create the order
    order = new Parse.Object('Orders');
    order.set('name', request.params.name);
    order.set("client", user);
    order.set('items', request.params.items);
    order.set('DeliveryOn', request.params.deliverydate);
    order.set('payment_method', request.params.payment_method);
    order.set('Location', request.params.deliverylocation);
    if(request.params.payment_method === 'Credit Card'){
      order.set('Paid', true); 
    }else{
      order.set('Paid', false); 
    }
    order.set('amount', request.params.amount);
    ordercount++;
    order.set('number', ordercount);  
    order.set('Completed', false);  
    
    // Create new order
    return order.save().then(null, function(error) {
      console.log('Creating order object failed. Error: ' + error);
      return Parse.Promise.error('Error - Order not placed, Please contact Us');
    });

  
  }).then(function(order) {     
     // Send Mail to User
     Parse.Cloud.httpRequest({
        method: "POST",
        url: "https://api:" + process.env.MAILGUN_API_KEY + "@api.mailgun.net/v2/" + process.env.MAILGUN_DOMAIN + "/messages",
        body: { 
            to: request.params.mail , 
            from: 'Your Order <' + process.env.MAILGUN_SMTP_LOGIN +'>', 
            cc: process.env.SECONDBCC,
            bcc: process.env.BCC,
            subject: "Thank You for your Order! - Order No. " + ordercount++, 
            html: request.params.html
            }}).then(null, function(error) {
            return Parse.Promise.error('Error - Order not placed, Please contact Us');
        });
    
  
  }).then(function() {     
     // Get Items
     var query = new Parse.Query("Items");
     return query.find().then(null, function(error){
            return Parse.Promise.resolve("Order done, but there is a problem saving increments");
     });
   
  }).then(function(results) {     
     // Save Items Sold Count
     if (results.length == 0)
     {
       return Parse.Promise.resolve("Order done, but there is a problem saving increments");
     }else{
       var itemsArray = [];
       // Get the array of order     
       var paramsitemsArray = request.params.itemsarray;
       // Increment the count of every sold item      
       for (var i = 0; i < results.length; i++) {
          var object = results[i];
          for (var r = 0; r < paramsitemsArray.length; r++) {
             if(object.get('title') === paramsitemsArray[r].title){
                object.increment('sold', + paramsitemsArray[r].quantity);
                itemsArray.push(object);
              }   
           } 
        }
        // Save All 
     return Parse.Object.saveAll(itemsArray).then(null, function(error){
        return Parse.Promise.resolve("Order done, but there is a problem saving increments");
     }); 
     }
     
  
  }).then(function(results) {
    // And we're done!
    response.success('Success');
  
  }, function(error) {
    response.error(error);
  });
});   
