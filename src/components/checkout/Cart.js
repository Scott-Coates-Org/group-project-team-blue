import { Col, List, Button } from 'reactstrap';

const dummyDetails = {
  subtotal: 78.0,
  transactionFee: 0.0,
};

const PaymentDetails = ({ details }) => {
  const { subtotal, transactionFee, tax } = details;
  return (
    <List type="unstyled">
      <li className="d-flex justify-content-between">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </li>
      <li className="d-flex justify-content-between">
        <span>Transaction Fee</span>
        <span>${transactionFee.toFixed(2)}</span>
      </li>
      <li className="d-flex justify-content-between">
        <span>Tax</span>
        <span>${((transactionFee + subtotal) * 0.1).toFixed(2)}</span>
      </li>
    </List>
  );
};

const Cart = () => {
  return (
    <Col className="col-md-5">
      <div className="bg-white px-4 pt-4 pb-5 rounded ">
        <h2>Your Cart</h2>
        <hr />
        <p>Your cart is currently empty.</p>
        <hr />
        <h3>Total payment required</h3>
        <PaymentDetails details={dummyDetails} />
        <Button color="warning" block>
          Continue
        </Button>
      </div>
    </Col>
  );
};

export default Cart;
