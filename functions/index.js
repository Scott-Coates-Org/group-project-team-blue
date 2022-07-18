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
    name: fullName,
    email: data.email,
    phone: data.phone,
  });
  const intent = await stripe.setupIntents.create({customer: customer.id});
  await admin.firestore().collection("stripe_customers").add({
    customer_id: customer.id,
    setup_secret: intent.client_secret,
  });
  const snapshot = await admin
      .firestore()
      .collection("stripe_customers")
      .where("customer_id", "==", customer.id)
      .get();
  const snap = snapshot.docs[0].id;
  return {
    customerID: customer.id,
    clientSecret: intent.client_secret,
    docID: snap,
  };
});

const calculateOrderAmount = (data) => {
  let subtotal = 0;
  let total = 0;
  const transactionFee = 500;
  const tax = 1.05;
  if (data[0] != undefined) {
    for (const item of data) {
      subtotal += (item.price * item.quantity);
    }
    total = Math.round(((subtotal * 100) * tax)) + transactionFee;
    return total;
  }
  return 1400;
};

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  const products = data.orders.products;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(products),
    // amount: 1400,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      docID: data.docID,
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
    const event = stripeWebhook.webhooks.constructEvent(
        request.rawBody,
        sig,
        endpointSecret,
    );

    // Add the event to the database`
    return admin
        .database()
        .ref("/events")
        .push(event)
        .then((snapshot) => {
        // Return a successful response to
        // acknowledge the event was processed successfully
          return response.json({
            received: true,
            ref: snapshot.ref.toString(),
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
    to: "marge.consunji@gmail.com",
    from: "mentorshipteamblue@gmail.com",
    subject: "Hopper - Booking Confirmation",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    templateId: "d-da2e6b3a1b434600aefd89e11ead3048",
    dynamicTemplateData: {
      firstname: "Marge",
    },
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

// want transactionId, confirmDate, amount, receiptURL

exports.addStripeDataToDB = functions.database.ref("/events/{eventId}")
    .onCreate( async (snapshot, context) => {
      const docID = snapshot.val().data.object.metadata.docID;
      const amount = snapshot.val().data.object.amount_received;
      const transactionID = snapshot.val().data.object.id;
      const receiptURL = snapshot.val().data.object.charges.data[0].receipt_url;
      const unixTime = snapshot.val().created;
      const milliseconds = unixTime * 1000;
      const dateObject = new Date(milliseconds);
      const dbTime = dateObject.toString();
      await admin.firestore().collection("bookings").doc(docID).update({
        "stripe.amount": amount,
        "stripe.receiptURL": receiptURL,
        "stripe.transactionID": transactionID,
        "stripe.confirmDate": dbTime,
      });
      return console.log({
        eventId: context.params.eventId,
        data: snapshot.val().data.object.metadata.docID,
      });
    });
