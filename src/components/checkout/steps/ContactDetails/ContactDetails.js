import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';
import WizardStep from 'components/checkout/WizardStep';

const ContactDetails = () => {
  const { nextStep, previousStep } = useWizard();
  return (
    <WizardStep stepHeader="Enter your details">
      <p>User inputs their contact details in this bit.</p>
      <div className="d-flex">
        <Button
          color="secondary"
          onClick={() => previousStep()}
          className={'flex-grow-1 w-50 mr-2'}
          outline
        >
          Back
        </Button>
        <Button
          color="warning"
          onClick={() => nextStep()}
          className="flex-grow-1 w-75"
        >
          Continue
        </Button>
      </div>
    </WizardStep>
  );
};

export default ContactDetails;
