import { Col, Progress, Button } from 'reactstrap';

const Wizard = () => {
  return (
    <Col className="col-md-7 pb-2 pb-sm-0">
      <div className="px-4 py-5 bg-white rounded">
        <h2>Buy a Pass</h2>
        <hr />
        <small className="text-uppercase mb-2 d-block">Step 1 of 4</small>
        <Progress />
      </div>
    </Col>
  );
};

export default Wizard;
