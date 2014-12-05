Paypal.payment = {};

Paypal.payment.list = function(){
  return Meteor.call("payPalPaymentList");
};

Paypal.payment.payPalCreatePayment = function(price, days, tenant, renter,bookingId){
  console.log("payPalExamplePayment");
  Session.set("payPalStatus", "working");
  return Meteor.call("payPalCreatePayment", [price, days, tenant, renter,bookingId], function(error, result){
    console.log(error, result);
    Session.set("payPalStatus", "pending");
    Session.set("payPalApprovalUrl", result);
    return result;
  });
};

Paypal.payment.payPalExecutePayment = function(paymentId, payerId, callback){
   return Meteor.call("payPalExecutePayment", paymentId, {"payer_id": payerId}, function(error, result){
     if(error){
      callback(error, undefined);
     }else{
      callback(undefined, result);
     }
   });
};
