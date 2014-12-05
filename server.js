var paypal_sdk = Npm.require('paypal-rest-sdk');
var Future = Npm.require('fibers/future');
var Fiber = Npm.require('fibers');
Paypal.payment = paypal_sdk.payment;
Paypal.credit_card = paypal_sdk.credit_card;

Paypal.setConfig = function(config){
  paypal_sdk.configure(config);
  paypal_sdk.generate_token(function(error, token){
    if(error){
      // console.error("generate Token error: " + error);
    } else {
      console.log("token: " + token);
    }
  });
};

Meteor.methods({
  "PayPalPaymentList": function(){
    paypal_sdk.payment.list({ "count": 10 }, function(error, payment_history){
      if(error){
        console.log("error: " + error);
        return error;
      } else {
        console.log("error: " + payment_history);
        return payment_history;
      }
    });
    return false;
  },
  "payPalCreatePayment": function(data){
    var payment_details = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": Meteor.absoluteUrl() + "paypal/return",
        "cancel_url": Meteor.absoluteUrl() + "paypal/cancle"
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": "Room",
            "sku": "Room",
            "price": parseInt(data[0]),
            "currency": "EUR",
            "quantity": data[1]
          }]
        },
        "amount": {
          "currency": "EUR",
          "total": parseInt(data[0])*parseInt(data[1])
        },
        "description": "This is the payment description."
      }]
    };
    var bookingId = data[4];
    // var booking = Booking.findOne(data[5]);
    var fut = new Future();
    paypal_sdk.payment.create(payment_details, function(error, payment){
      if(error){
        fut.return(error);
      } else {
        console.log("else:" , data[4]);
        var bookingUpdate = Fiber(function (bookingId) {
          console.log(bookingId);
          Booking.update(bookingId ,{$set : {"payment": payment}}, function(error) {
            if(error)
              console.log(error);
            });
          });
          bookingUpdate.run(bookingId);
          for (var i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              fut.return(payment.links[i].href);
            }
          }
        }
      });
      return fut.wait();
    },
    "payPalExecutePayment": function(paymentId, paymentDetails){
      var fut = new Future();
      paypal_sdk.payment.execute(paymentId, paymentDetails.payer_id, function(error, payment){
        if(error){
          console.log(error);
          fut.return("something went Wrong please Retry!");
        }else{
          if(payment.state === 'approved'){
            fut.return('approved');
          }else{
            fut.return('Not approved');
          }
        }
      });
      return fut.wait();
    }
  });
