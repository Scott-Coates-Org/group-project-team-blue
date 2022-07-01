import WizardStep from '../WizardStep';

const PaymentDetails = () => {
  return (
    <WizardStep stepHeader="Select payment details">
      <p>
        Stripe bit goes here. User should be able to complete their purchase.
      </p>
    </WizardStep>
  );
};

export default PaymentDetails;
