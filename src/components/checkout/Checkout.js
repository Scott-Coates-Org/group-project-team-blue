import { Container, Row } from 'reactstrap';
import WizardContainer from './WizardContainer';
import Cart from './cart/Cart';

const Checkout = () => {
  return (
    <div className="h-100 checkout-bg">
      <Container className="py-5">
        <Row xs="1">
          <WizardContainer />
          <Cart />
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
