import { useWizard } from 'react-use-wizard';
import { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import WizardStep from 'components/checkout/wizard-parts/WizardStep';
import Stripe from 'components/stripe/Stripe';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { firebase } from 'firebase/client';
require('firebase/functions');

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const { previousStep } = useWizard();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = firebase
      .functions()
      .httpsCallable('createPaymentIntent');

    createPaymentIntent().then((result) =>
      setClientSecret(result.data.clientSecret)
    );
  }, []);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
    loader: 'always',
  };
  return (
    <WizardStep stepHeader="Select payment details">
      <div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <Stripe props={clientSecret} />
          </Elements>
        )}
      </div>
      <div className="d-flex">
        <Button
          color="secondary"
          onClick={() => previousStep()}
          className={'flex-grow-1 w-50'}
          outline
        >
          Back
        </Button>
      </div>
    </WizardStep>
  );
};

export default StripePayment;
