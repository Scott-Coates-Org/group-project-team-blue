import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';
import WizardStep from '../WizardStep';

const ProductSelect = () => {
  const { nextStep, previousStep } = useWizard();
  return (
    <WizardStep stepHeader="Select add-ons">
      <p>List of add-ons goes here</p>
      <div className="d-flex">
        <Button
          color="secondary"
          onClick={() => previousStep()}
          className="flex-grow-1 w-50 mr-2"
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

export default ProductSelect;
