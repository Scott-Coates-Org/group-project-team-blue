import { Button } from 'reactstrap';

const timeSlots = [
  { time: '10:00am' },
  { time: '10:30am' },
  { time: '11:00am' },
  { time: '11:30am' },
  { time: '12:00pm' },
  { time: '12:30pm' },
  { time: '1:00pm' },
  { time: '1:30pm' },
  { time: '2:00pm' },
  { time: '2:30pm' },
  { time: '3:00pm' },
  { time: '3:30pm' },
  { time: '4:00pm' },
  { time: '4:30pm' },
  { time: '5:00pm' },
  { time: '5:30pm' },
  { time: '6:00pm' },
  { time: '6:30pm' },
  { time: '7:00pm' },
  { time: '7:30pm' },
  { time: '8:00pm' },
];

const TimeSelect = () => {
  return (
    <>
      <p className="font-weight-bold">Session time</p>
      <div className="d-flex flex-wrap mb-2">
        {timeSlots.map(({ time }) => (
          <Button key={time} className="mx-1 mb-1" outline>
            {time}
          </Button>
        ))}
      </div>
    </>
  );
};

export default TimeSelect;
