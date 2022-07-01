import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';
import WizardStep from '../WizardStep';

const PaymentDetails = () => {
  const { isLastStep, previousStep } = useWizard();
  return (
    <WizardStep stepHeader="Select payment details">
      <p>
        Stripe bit goes here. User should be able to complete their purchase.
      </p>
      <div className="d-flex">
        <Button
          color="secondary"
          onClick={() => previousStep()}
          className={`flex-grow-1 w-50 ${isLastStep ? '' : 'mr-2'}`}
          outline
        >
          Back
        </Button>
      </div>
    </WizardStep>
  );
};

export default PaymentDetails;
