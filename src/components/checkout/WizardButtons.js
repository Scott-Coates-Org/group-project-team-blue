import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';

const WizardButtons = () => {
  const { nextStep, isFirstStep, isLastStep, previousStep } = useWizard();
  return (
    <div>
      {!isFirstStep ? (
        <Button onClick={() => previousStep()}>Back</Button>
      ) : null}
      {!isLastStep ? (
        <Button color="primary" onClick={() => nextStep()}>
          Continue
        </Button>
      ) : null}
    </div>
  );
};

export default WizardButtons;
