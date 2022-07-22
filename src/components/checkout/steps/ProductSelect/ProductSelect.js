import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, reduceQty, setBookingTime } from 'redux/cartDetails';
import { fetchAllProducts } from 'redux/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Spinner, InputGroup, Input, Button } from 'reactstrap';
import TimeSelect from './TimeSelect';
import { useWizard } from 'react-use-wizard';
import WizardStep from 'components/checkout/wizard-parts/WizardStep';
import 'react-calendar/dist/Calendar.css';
import './productSelect.css';

const productCapacities = 
  { '5c4cXcnzwtFmZT9gtKhS': [
    { idx: 0,
      time: "10:00",
      remainingCapacity: 0
    },
    { idx: 1,
      time: "10:30",
      remainingCapacity: 0
    },
    { idx: 2,
      time: "11:00",
      remainingCapacity: 0
    },
    { idx: 3,
      time: "11:30",
      remainingCapacity: 5
    },
    { idx: 4,
      time: "12:00",
      remainingCapacity: 0
    },
    { idx: 5,
      time: "12:30",
      remainingCapacity: 12
    },
    { idx: 6,
      time: "13:00",
      remainingCapacity: 50
    },
    { idx: 7,
      time: "13:30",
      remainingCapacity: 10
    },
    { idx: 8,
      time: "14:00",
      remainingCapacity: 0
    },
    { idx: 9,
      time: "14:30",
      remainingCapacity: 40
    },
    { idx: 10,
      time: "15:00",
      remainingCapacity: 20
    },
    { idx: 11,
      time: "15:30",
      remainingCapacity: 21
    },
    { idx: 12,
      time: "16:00",
      remainingCapacity: 0
    },
    { idx: 13,
      time: "16:30",
      remainingCapacity: 0
    },
    { idx: 14,
      time: "17:00",
      remainingCapacity: 10
    },
    { idx: 15,
      time: "17:30",
      remainingCapacity: 11
    },
    { idx: 16,
      time: "18:00",
      remainingCapacity: 20
    },
    { idx: 17,
      time: "18:30",
      remainingCapacity: 21
    },
    { idx: 18,
      time: "19:00",
      remainingCapacity: 0
    },
    { idx: 19,
      time: "19:30",
      remainingCapacity: 22
    },
    { idx: 20,
      time: "20:00",
      remainingCapacity: 14
    },
    { idx: 21,
      time: "20:30",
      remainingCapacity: 6
    },
    { idx: 22,
      time: "21:00",
      remainingCapacity: 0
    },
  ],
  'lQq80BfyHvS5THLnAC95': [
    { idx: 0,
      time: "10:00",
      remainingCapacity: 0
    },
    { idx: 1,
      time: "10:30",
      remainingCapacity: 0
    },
    { idx: 2,
      time: "11:00",
      remainingCapacity: 0
    },
    { idx: 3,
      time: "11:30",
      remainingCapacity: 5
    },
    { idx: 4,
      time: "12:00",
      remainingCapacity: 0
    },
    { idx: 5,
      time: "12:30",
      remainingCapacity: 12
    },
    { idx: 6,
      time: "13:00",
      remainingCapacity: 50
    },
    { idx: 7,
      time: "13:30",
      remainingCapacity: 10
    },
    { idx: 8,
      time: "14:00",
      remainingCapacity: 0
    },
    { idx: 9,
      time: "14:30",
      remainingCapacity: 40
    },
    { idx: 10,
      time: "15:00",
      remainingCapacity: 20
    },
    { idx: 11,
      time: "15:30",
      remainingCapacity: 21
    },
    { idx: 12,
      time: "16:00",
      remainingCapacity: 0
    },
    { idx: 13,
      time: "16:30",
      remainingCapacity: 0
    },
    { idx: 14,
      time: "17:00",
      remainingCapacity: 10
    },
    { idx: 15,
      time: "17:30",
      remainingCapacity: 11
    },
    { idx: 16,
      time: "18:00",
      remainingCapacity: 20
    },
    { idx: 17,
      time: "18:30",
      remainingCapacity: 21
    },
    { idx: 18,
      time: "19:00",
      remainingCapacity: 0
    },
    { idx: 19,
      time: "19:30",
      remainingCapacity: 22
    },
    { idx: 20,
      time: "20:00",
      remainingCapacity: 14
    },
    { idx: 21,
      time: "20:30",
      remainingCapacity: 6
    },
    { idx: 22,
      time: "21:00",
      remainingCapacity: 0
    },
  ]
  }



const AccordionItem = ({ ...props }) => {
  const dispatch = useDispatch();
  const [quant, setQuant] = useState(0);
  const [time, setTime] = useState('');
  const { id, title, photo, desc, price, duration, type, room } = props;
  const [open, setOpen] = useState(false);

  const productTimeslots = productCapacities[id];

  const handleSetTime = (id, time) => {
    setTime(time);
    dispatch(setBookingTime({ id: id, time: time }));
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleQuantity = (e) => {
    setQuant(e.target.value);
  };
  const increment = (id, title, price, duration, type, time, room) => {
    setQuant(quant + 1);
    dispatch(
      addToCart({
        id: id,
        title: title,
        price: price,
        type: type,
        duration: duration,
        time: time,
        quantity: 0,
        room: room,
      })
    );
  };

  const decrement = (id) => {
    if (quant > 0) {
      setQuant(quant - 1);
      dispatch(reduceQty(id));
    }
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
          {duration > 0 ? (
            <TimeSelect
              duration={duration}
              id={id}
              timeSlots={productTimeslots}
              handleSetTime={handleSetTime}
            />
          ) : null}
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column flex-sm-row flex-grow-1 w-100">
              <span className="font-weight-bold d-block d-md-inline mr-auto">
                {title}
              </span>
              {duration > 0 ? (
                <span className="mr-2 text-gray d-block d-md-inline">
                  {duration} mins
                </span>
              ) : (
                <span></span>
              )}
              <span className="font-weight-bold mr-2 d-block d-md-inline">
                ${price.toFixed(2)}
              </span>
            </div>
            <InputGroup className="align-self-md-end product-checkout-quantity">
              <div className="input-group-prepend">
                <Button onClick={() => decrement(id)}>-</Button>
              </div>
              <Input
                className="text-center"
                min="0"
                value={quant}
                onChange={handleQuantity}
              />
              <div className="input-group-append">
                <Button
                  onClick={() =>
                    increment(id, title, price, duration, type, time, room)
                  }
                >
                  +
                </Button>
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
  const { nextStep, previousStep } = useWizard();
  const { data, isLoaded, hasErrors } = useSelector((state) => state.product);
  const products = data.filter(({ type }) => type === 'product');

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <WizardStep stepHeader="Select your products">
      {!isLoaded ? (
        <div className="py-3 w-100 d-flex my-4 justify-content-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <div>
              {products.map(
                ({ id, title, photo, desc, price, duration, type, room }) => (
                  <AccordionItem
                    key={id}
                    {...{ id, title, photo, desc, price, duration, type, room }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
      <div className="d-flex">
        <Button
          color="secondary"
          onClick={() => previousStep()}
          className={'flex-grow-1 w-50 mr-2'}
          outline
        >
          Back
        </Button>
        <Button
          color="warning"
          onClick={() => nextStep()}
          className="flex-grow-1 w-75"
        >
          Continue
        </Button>
      </div>
    </WizardStep>
  );
};

export default ProductSelect;
