import { Progress } from 'reactstrap';
import { useWizard } from 'react-use-wizard';

const WizardHeader = () => {
  const { activeStep } = useWizard();
  let step = activeStep + 1;
  return (
    <div className="mb-4">
      <small className="text-uppercase mb-2 d-block">Step {step} of 4</small>
      <Progress value={step * 25} />
    </div>
  );
};

export default WizardHeader;
