import { Button } from 'reactstrap';
import { useWizard } from 'react-use-wizard';
import { useState } from 'react';
import Calendar from 'react-calendar';
import WizardStep from 'components/checkout/WizardStep';
import 'react-calendar/dist/Calendar.css';
import './dateSelect.css';

const DateSelect = () => {
  const { nextStep } = useWizard();
  const [date, setDate] = useState(null);

  return (
    <WizardStep stepHeader="Select a date">
      <div className="mb-4">
        <Calendar
          onChange={setDate}
          value={date}
          minDate={new Date()}
          maxDate={new Date('December 31, 2025')}
        />
      </div>
      <div className="d-flex">
        <Button
          color="warning"
          onClick={() => nextStep()}
          className="flex-grow-1 w-75"
          disabled={!date}
        >
          Continue
        </Button>
      </div>
    </WizardStep>
  );
};

export default DateSelect;
