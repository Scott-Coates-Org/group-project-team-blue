import { useSelector } from 'react-redux';
import { Col, List, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const dummyDetails = {
  subtotal: 78.0,
  transactionFee: 0.0,
};

const dummyCart = [
  {
    product: 'Product 1',
    quantity: 2,
    price: 10.0,
  },
  {
    product: 'Product 2',
    quantity: 1,
    price: 20.0,
  },
];

const CartDetails = () => {
  let bookingDate = useSelector(({ cartDetails }) => cartDetails.bookingDate);
  return (
    <div>
      <span className="bg-primary px-2 py-1 d-inline-block w-auto mb-3 text-white rounded">
        {bookingDate}
      </span>

      <List type="unstyled">
        {dummyCart.map(({ product, quantity, price }) => (
          <li key={product} className="d-flex align-items-start">
            <p>
              {quantity}
              <span className="mx-1">x</span>
              {product}
            </p>
            <p className="ml-auto d-flex align-items-center">
              ${(quantity * price).toFixed(2)}
              <FontAwesomeIcon
                role="button"
                icon={faTrash}
                className="text-danger ml-2"
              />
            </p>
          </li>
        ))}
      </List>
    </div>
  );
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
