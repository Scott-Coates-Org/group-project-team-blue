import { Col } from 'reactstrap';

const Cart = () => {
  return (
    <Col className="col-md-5">
      <div className="bg-white px-4 py-5 rounded ">
        <h2>Your Cart</h2>
        <p>Your cart is currently empty.</p>
      </div>
    </Col>
  );
};

export default Cart;
