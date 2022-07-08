import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCosts } from 'redux/cartDetails';
import { removeFromCart } from 'redux/cartDetails';
import { Col, List } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CartDetails = ({ products }) => {
  const dispatch = useDispatch();
  let bookingDate = useSelector(({ cartDetails }) => cartDetails.bookingDate);

  return (
    <div>
      <span className="bg-primary px-2 py-1 d-inline-block w-auto mb-3 text-white rounded">
        {bookingDate}
      </span>

      <List type="unstyled">
        {products.map(({ quantity, title, price, id }) => (
          <li key={id} className="d-flex align-items-start">
            <p>
              {quantity}
              <span className="mx-1">x</span>
              {title}
            </p>
            <p className="ml-auto d-flex align-items-center">
              ${(quantity * price).toFixed(2)}
              <FontAwesomeIcon
                role="button"
                icon={faTrash}
                className="text-danger ml-2"
                onClick={() => dispatch(removeFromCart(id))}
              />
            </p>
          </li>
        ))}
      </List>
    </div>
  );
};

const PaymentDetails = ({ costs }) => {
  const { subtotal, total } = costs;
  const transactionFee = 5.0;
  const taxRate = 0.05;
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
          <span>${(subtotal * taxRate).toFixed(2)}</span>
        </li>
        <li className="d-flex justify-content-between">
          <span>
            <strong>Total (Inc. Tax)</strong>
          </span>
          <span>${total.toFixed(2)}</span>
        </li>
      </List>
    </div>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(({ cartDetails }) => cartDetails.products);
  const costs = useSelector(({ cartDetails }) => cartDetails.costs);

  useEffect(() => {
    dispatch(getCosts());
  }, [products]);
  return (
    <Col className="col-md-5">
      <div className="bg-white px-4 pt-4 pb-5 rounded ">
        <h2>Your Cart</h2>
        <hr />
        {products.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          <>
            <CartDetails products={products} />
            <hr />
            <PaymentDetails costs={costs} />
          </>
        )}
      </div>
    </Col>
  );
};

export default Cart;
