import { Container, Row } from 'reactstrap';
import WizardContainer from './WizardContainer';
import Cart from './cart/Cart';

const Checkout = () => {
  return (
    <div className="vh-100 checkout-bg">
      <Container className="pt-5">
        <Row xs="1">
          <WizardContainer />
          <Cart />
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
