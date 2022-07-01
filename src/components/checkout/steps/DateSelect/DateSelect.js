import { useState } from 'react';
import Calendar from 'react-calendar';
import WizardStep from 'components/checkout/WizardStep';
import 'react-calendar/dist/Calendar.css';
import './dateSelect.css';

const DateSelect = () => {
  const [date, setDate] = useState(new Date());

  const handleSetDate = () => {
    setDate(date);
    console.log(date);
  };
  return (
    <WizardStep stepHeader="Select a date">
      <Calendar
        onChange={setDate}
        value={date}
        minDate={new Date()}
        maxDate={new Date('December 31, 2025')}
        onClickDay={handleSetDate}
      />
    </WizardStep>
  );
};

export default DateSelect;
