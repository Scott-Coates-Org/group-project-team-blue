import { Container, Row } from 'reactstrap';
import Wizard from './Wizard';
import Cart from './Cart';

const Checkout = () => {
  return (
    <div className="vh-100 checkout-bg">
      <Container className="px-5 pt-5">
        <Row xs="1">
          <Wizard />
          <Cart />
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
