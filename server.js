var paypal_sdk = Npm.require('paypal-rest-sdk');
var Future = Npm.require('fibers/future');
var Fiber = Npm.require('fibers');
Paypal.setConfig = function(config) {
  paypal_sdk.configure(config);
  paypal_sdk.generate_token(function(error, token) {
    if (error) {
      return new Meteor.Error(error, "could not get Token from Paypal");
    } else {
      return true;
    }
  });
  return true;
};
Paypal.preFunctions = {
  "payPalCreatePayPalPayment": function() {
    return false;
  }
};

Meteor.methods({
  "PayPalPaymentDetails": function(payId) {
    this.unblock();
    var fut = new Future();
    paypal_sdk.payment.get(payId, function(error, payment) {
      if (error !== null) {
        fut.throw(error);
      } else {
        fut.return(payment);
      }
    });
    return fut.wait();
  },
  "PayPalPaymentList": function() {
    this.unblock();
    var fut = new Future();
    paypal_sdk.payment.list({
      "count": 10
    }, function(error, payment_history) {
      if (error) {
        fut.error(error);
      } else {
        fut.return(payment_history);
      }
    });
    return fut.wait();
  },
  "payPalCreatePayPalPayment": function(payment) {
    this.unblock();
    if (payment.intent === undefined) {
      payment.intent = "sale";
    }
    if (payment.paymentMethod === undefined) {
      payment.paymentMethod = "paypal";
    }
    if (payment.currency === undefined) {
      payment.currency = "EUR";
    }
    if (payment.name === undefined) {
      payment.name = "Name";
    }
    if (payment.sku === undefined) {
      payment.sku = "SKU";
    }
    if (payment.quantity === undefined) {
      payment.quantity = "1";
    }
    if (payment.description === undefined) {
      payment.description = "This is the payment description.";
    }
    if (payment.returnUrl === undefined) {
      payment.returnUrl = Meteor.absoluteUrl() + "paypal/return";
    }
    if (payment.cancelUrl === undefined) {
      payment.cancelUrl = Meteor.absoluteUrl() + "paypal/cancle/" + payment._id;
    }
    var payment_details = {
      "intent": payment.intent,
      "payer": {
        "payment_method": payment.paymentMethod
      },
      "redirect_urls": {
        "return_url": payment.returnUrl,
        "cancel_url": payment.cancelUrl
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": payment.name,
            "sku": payment.sku,
            "price": payment.totalPrice,
            "currency": payment.currency,
            "quantity": payment.quantity
          }]
        },
        "amount": {
          "currency": payment.currency,
          "total": payment.totalPrice
        },
        "description": payment.description
      }]
    };
    var fut = new Future();
    paypal_sdk.payment.create(payment_details, function(error, payment) {
      if (error) {
        fut.throw(error);
      } else {
        fut.return(payment);
      }
    });
    return fut.wait();
  },
  "payPalExecutePayment": function(paymentId, payerId) {
    this.unblock();
    var fut = new Future();
    paypal_sdk.payment.execute(paymentId, {
      payer_id: payerId
    }, function(error, payment) {
      if (error) {
        console.log(error);
        fut.throw(error);
      } else {
        fut.return(payment);
      }
    });
    return fut.wait();
  }
});
