//TODO: needs rewrite !

// Paypal.payment = {};
//
// Paypal.payment.list = function() {
//   return Meteor.call("payPalPaymentList");
// };
// Paypal.payment.PayPalPaymentDetails = function(payId, callback){
//   Meteor.call("PayPalPaymentDetails", payId, function(error, payment){
//     if(error){
//       callback(error, undefined);
//       return error;
//     }else{
//       callback(undefined, payment);
//       return payment;
//     }
//   });
// };
// Paypal.payment.payPalCreatePayPalPayment = function(obj, callback) {
//   if (typeof postFunction !== 'function') {
//     return new Meteor.Error("500", "postFunction has to be a function");
//   }
//   return Meteor.call("payPalCreatePayPalPayment", obj, function(error, result) {
//     if (error) {
//       return new Meteor.Error("500", error);
//     }
//     callback(result);
//     return result;
//   });
// };
//
// Paypal.payment.payPalExecutePayment = function(paymentId, payerId, callback) {
//   return Meteor.call("payPalExecutePayment", paymentId, {
//     "payer_id": payerId
//   }, function(error, result) {
//     if (error) {
//       callback(error, undefined);
//     } else {
//       callback(undefined, result);
//     }
//   });
// };
