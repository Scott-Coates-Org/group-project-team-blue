import { Col, List, Button } from 'reactstrap';

const dummyDetails = {
  subtotal: 78.0,
  transactionFee: 0.0,
};

const dummyCart = {
  product: 'Junior Jumpers Jam',
  type: {
    name: 'Junior Jumper Parent',
    price: 10.0,
    quantity: 1,
  },
};

const CartDetails = () => {
  return <List type="unstyled">test</List>;
};

const PaymentDetails = ({ details }) => {
  const { subtotal, transactionFee, tax } = details;
  return (
    <div>
      <h3>Total payment required</h3>
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
        <li className="d-flex justify-content-between">
          <span>
            <strong>Total (Inc. Tax)</strong>
          </span>
          <span>
            $
            {(
              subtotal +
              transactionFee +
              (transactionFee + subtotal) * 0.1
            ).toFixed(2)}
          </span>
        </li>
      </List>
    </div>
  );
};

const Cart = () => {
  return (
    <Col className="col-md-5">
      <div className="bg-white px-4 pt-4 pb-5 rounded ">
        <h2>Your Cart</h2>
        <hr />
        <CartDetails />
        <hr />
        <PaymentDetails details={dummyDetails} />
        <Button color="warning" block>
          Continue
        </Button>
      </div>
    </Col>
  );
};

export default Cart;
