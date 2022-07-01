import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from 'redux/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Spinner, InputGroup, Input, Button } from 'reactstrap';
import './productSelect.css';
import WizardStep from '../WizardStep';

const dummySessions = [
  { time: '10.00am' },
  { time: '10.30am' },
  { time: '11.00am' },
  { time: '11.30am' },
  { time: '12.00pm' },
  { time: '12.30' },
  { time: '13.00' },
  { time: '14.00' },
  { time: '15.00' },
  { time: '16.00' },
  { time: '17.00' },
  { time: '18.00' },
  { time: '19.00' },
  { time: '20.00' },
];

const Sessions = () => {
  return (
    <div className="d-flex flex-wrap mb-2">
      {dummySessions.map(({ time }) => (
        <Button className="mx-1 mb-1" outline>
          {time}
        </Button>
      ))}
    </div>
  );
};

const AccordionItem = ({ ...props }) => {
  const { title, photo, desc, price, duration } = props;
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div role="button" className="px-2 py-3 border-bottom">
      <div
        className="d-flex align-items-center justify-content-between"
        onClick={handleToggle}
      >
        <img className="accordion-image mr-3" src={photo} />
        <p className="mb-0 font-weight-bold flex-grow-1">{title}</p>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`accordion-chevron text-primary ${open ? 'open' : ''}`}
        />
      </div>
      {open ? (
        <div className="pt-3">
          <p>{desc}</p>
          <p className="font-weight-bold">Session time</p>
          <Sessions />
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column flex-sm-row flex-grow-1 w-100">
              <span className="font-weight-bold d-block d-md-inline mr-auto">
                {title}
              </span>
              <span className="mr-2 text-gray d-block d-md-inline">
                {duration} mins
              </span>
              <span className="font-weight-bold mr-2 d-block d-md-inline">
                ${price.toFixed(2)}
              </span>
            </div>
            <InputGroup className="align-self-md-end product-checkout-quantity">
              <div className="input-group-prepend">
                <Button>-</Button>
              </div>
              <Input className="text-center" placeholder="0" />
              <div className="input-group-append">
                <Button>+</Button>
              </div>
            </InputGroup>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ProductSelect = () => {
  const dispatch = useDispatch();
  const { data, isLoaded, hasErrors } = useSelector((state) => state.product);
  const products = data.filter(({ type }) => type === 'product');

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // console.log({ data, isLoaded, hasErrors });
  return (
    <WizardStep stepHeader="Select your products">
      <div>
        {!isLoaded ? (
          <div className="py-3 w-100 d-flex justify-content-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <>
            {products.map(({ id, title, photo, desc, price, duration }) => (
              <AccordionItem
                key={id}
                {...{ title, photo, desc, price, duration }}
              />
            ))}
          </>
        )}
      </div>
    </WizardStep>
  );
};

export default ProductSelect;
