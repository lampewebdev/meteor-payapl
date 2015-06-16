# Meteor PayPal Package

## Installation

```sh
meteor add lampe:paypal
```

## Setup on Server:

```javascript
Paypal.setConfig({
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'XXX',
    'client_secret': 'ZZZ'
});

```

## Meteor Methods:

```javascript
Meteor.call("PayPalPaymentDetails", payId);
Meteor.call("PayPalPaymentList");
Meteor.call("payPalCreatePayPalPayment", payment);
Meteor.call("payPalExecutePayment", payId, payerId);
```
