const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const {Stripe} = require("stripe");
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});

exports.createStripeCustomer = functions.https.onCall(async (data, context) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const customer = await stripe.customers.create({
    name: fullName, email: data.email, phone: data.phone,
  });
  const intent = await stripe.setupIntents.create({customer: customer.id});
  await admin.firestore().collection("stripe_customers").add({
    customer_id: customer.id, setup_secret: intent.client_secret,
  });
  const snapshot = await admin.firestore().collection("stripe_customers")
      .where("customer_id", "==", customer.id).get();
  const snap = snapshot.docs[0].id;
  return {
    customerID: customer.id,
    clientSecret: intent.client_secret,
    docID: snap,
  };
});

exports.calculateOrderAmount = functions.https.onCall(async (data, context) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
});

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  // const {items} = data;
  const paymentIntent = await stripe.paymentIntents.create({
    // amount: calculateOrderAmount(items),
    amount: 1400,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return {
    clientSecret: paymentIntent.client_secret,
  };
});
