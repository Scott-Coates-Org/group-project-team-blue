import { Col, Progress, Button } from 'reactstrap';

const Wizard = () => {
  return (
    <Col className="bg-white col-md-7 px-4 py-5 rounded">
      <h2>Buy a Pass</h2>
      <hr />
      <small className="text-uppercase mb-2 d-block">Step 1 of 4</small>
    </Col>
  );
};

export default Wizard;
