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
// Paypal.payment.payPalCreatePayPalPayment = function(booking, callback) {
//   Session.set("payPalStatus", "working");
//   var bookingInfo = Booking.findOne({
//     _id: booking._id
//   });
//   for (var attrname in booking) {
//     bookingInfo[attrname] = booking[attrname];
//   }
//   return Meteor.call("payPalCreatePayPalPayment", booking, function(error, result) {
//     Session.set("payPalStatus", "pending");
//     // Session.set("payPalApprovalUrl", result);
//     if (error) {
//       return new Meteor.Error("500", error);
//     }
//     if (typeof callback == 'function') {
//       callback(result);
//     } else {
//       return new Meteor.Error("500", "Your Callback must be a function");
//     }
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
