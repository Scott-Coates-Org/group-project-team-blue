import { useState } from 'react';
import { Col } from 'reactstrap';
import { Wizard } from 'react-use-wizard';
import WizardHeader from './WizardHeader';
import ProductSelect from './steps/ProductSelect/ProductSelect';
import AddOns from './steps/AddOns';
import ContactDetails from './steps/ContactDetails';
import PaymentDetails from './steps/PaymentDetails';

const WizardContainer = () => {
  const [dateSelect, setDateSelect] = useState(true);

  return (
    <Col className="col-md-7 pb-2 pb-md-0">
      <div className="px-4 pt-4 pb-5 bg-white rounded">
        <h1>Buy a Pass</h1>
        <hr />
        <Wizard header={<WizardHeader />}>
          <ProductSelect />
          <AddOns />
          <ContactDetails />
          <PaymentDetails />
        </Wizard>
      </div>
    </Col>
  );
};

export default WizardContainer;
