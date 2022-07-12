import { Col } from 'reactstrap';
import { Wizard } from 'react-use-wizard';
import WizardHeader from './WizardHeader';
import DateSelect from './steps/DateSelect/DateSelect';
import ProductSelect from './steps/ProductSelect/ProductSelect';
import AddonSelect from './steps/AddonSelect/AddonSelect';
import ContactDetails from './steps/ContactDetails/ContactDetails';
import Waiver from './steps/Waiver/Waiver';
import PaymentDetails from './steps/PaymentDetails';

const WizardContainer = () => {
  return (
    <Col className="col-md-7 pb-2 pb-md-0">
      <div className="px-4 pt-4 pb-3 bg-white rounded">
        <h1>Buy a Pass</h1>
        <hr />
        <Wizard header={<WizardHeader />}>
          <DateSelect />
          <ProductSelect />
          <AddonSelect />
          <ContactDetails />
          <Waiver />
          <PaymentDetails />
        </Wizard>
      </div>
    </Col>
  );
};

export default WizardContainer;
