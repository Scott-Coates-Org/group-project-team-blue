import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { firebase } from "firebase/client";
import { createBooking, fetchAllBookings } from "redux/booking";
require("firebase/functions");

const Stripe = (props) => {
  const dispatch = useDispatch();
  const { bookingDate, products, customerDetails, waiver } = useSelector(
    ({ cartDetails }) => cartDetails
  );
  const { data, isLoaded, hasErrors } = useSelector((state) => state.booking);
  const stripe = useStripe();
  const elements = useElements();

  const bookingDetails = {
    customer: customerDetails,
    orders: {
      bookingDate: bookingDate,
      products: products,
    },
    stripe: {
      transactionID: "",
      confirmDate: "",
      amount: "",
      receiptURL: "",
    },
    waiver: waiver,
  };

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = props.clientSecret;

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form /* id="payment-form" */ onSubmit={handleSubmit}>
      <PaymentElement /* id="payment-element" */ />
      <Button
        color="success"
        block
        className="my-3 w-full"
        disabled={isLoading || !stripe || !elements}
        /* id="submit" */ type="submit"
      >
        <span /* id="button-text" */>
          {isLoading ? (
            <div /* className="spinner" id="spinner" */>loading</div>
          ) : (
            "Pay now"
          )}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div /* id="payment-message" */>{message}</div>}
    </form>
  );
};

export default Stripe;
