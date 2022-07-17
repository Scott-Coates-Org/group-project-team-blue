import { useWizard } from "react-use-wizard";
import { Button } from "reactstrap";
import WizardStep from "components/checkout/wizard-parts/WizardStep";
import Participants from "../Participants/Participants";

const Waiver = () => {
  const { nextStep, previousStep } = useWizard();
  return (
    <WizardStep stepHeader="Sign the Waiver">
      <p>Customer signs a waiver before moving forward with their purchase</p>
      <Participants />
      <div className="d-flex">
        <Button
          color="secondary"
          onClick={() => previousStep()}
          className={"flex-grow-1 w-50 mr-2"}
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

export default Waiver;
