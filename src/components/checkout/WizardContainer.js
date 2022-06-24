import { useState } from 'react';
import { Col, Progress, Button } from 'reactstrap';
import { Wizard, useWizard } from 'react-use-wizard';

const Step1 = () => {
  const { nextStep, isFirstStep } = useWizard();
  return (
    <>
      <h3>Step1</h3>
      <p>test</p>
      <div>
        <Button color="primary" onClick={() => nextStep()}>
          Continue
        </Button>
      </div>
    </>
  );
};
const Step2 = () => {
  const { previousStep, nextStep } = useWizard();
  return (
    <>
      <h3>Step2</h3>
      <p>test</p>
      <div>
        <Button onClick={() => previousStep()}>Back</Button>
        <Button onClick={() => nextStep()}>Continue</Button>
      </div>
    </>
  );
};

const WizardContainer = () => {
  return (
    <Col className="col-md-7 pb-2 pb-sm-0">
      <div className="px-4 py-5 bg-white rounded">
        <h2>Buy a Pass</h2>
        <hr />
        <small className="text-uppercase mb-2 d-block">Step 1 of 4</small>
        <Progress />
        <Wizard>
          <Step1 />
          <Step2 />
        </Wizard>
      </div>
    </Col>
  );
};

export default WizardContainer;
