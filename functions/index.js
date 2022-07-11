const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const {Stripe} = require("stripe");
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});
const stripeWebhook = require("stripe")(functions.config().keys.webhooks);
const endpointSecret = functions.config().keys.signing;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(functions.config().sendgrid.api);

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

exports.events = functions.https.onRequest((request, response) => {
  const sig = request.headers["stripe-signature"];

  try {
    // Validate the request
    const event = stripeWebhook.webhooks
        .constructEvent(request.rawBody, sig, endpointSecret);

    // Add the event to the database
    return admin.database().ref("/events").push(event)
        .then((snapshot) => {
        // Return a successful response to
        // acknowledge the event was processed successfully
          return response.json({
            received: true, ref: snapshot.ref.toString(),
          });
        })
        .catch((err) => {
        // Catch any errors saving to the database
          console.error(err);
          return response.status(500).end();
        });
  } catch (err) {
    // Signing signature failure, return an error 400
    return response.status(400).end();
  }
});

exports.sendEmail = functions.https.onCall(async (data, context) => {
  const msg = {
    to: "alechooyman@gmail.com", // Change to your recipient
    from: "mentorshipteamblue@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
});
