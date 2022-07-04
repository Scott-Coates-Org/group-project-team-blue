import { Button } from 'reactstrap';

// Calculate the number of minutes between opening and closing hours. In this case: 10.00-20.00 (10AM-8PM)
const generateTimeBlocks = (duration) => {
  let times = [];
  const startTime = 10;

  // Generates array of time strings from hours and a set time of day (eg. am, pm)
  const parseTime = (hh, timeOfDay) => {
    const min = ((hh * 10) % 10) / 10;
    const hour = hh - min;
    const time = `${hour}:${min * 6}0${timeOfDay}`;
    times.push(time);
  };

  if (duration === 60) {
    for (let i = startTime; i < 20; i++) {
      if (i < 12) {
        parseTime(i, 'am');
      } else if (i === 12) {
        parseTime(i, 'pm');
      } else {
        parseTime(i, 'pm');
      }
    }
  }
  // Given a 90 min long activity, the last slot should end at 7.00pm at the latest
  if (duration === 90) {
    for (let i = startTime; i < 19; i += 1.5) {
      if (i < 12) {
        parseTime(i, 'am');
      } else if (i === 12) {
        parseTime(i, 'pm');
      } else {
        parseTime(i, 'pm');
      }
    }
  }
  if (duration === 120) {
    for (let i = startTime; i < 20; i += 2) {
      if (i < 12) {
        parseTime(i, 'am');
      } else if (i === 12) {
        parseTime(i, 'pm');
      } else {
        parseTime(i, 'pm');
      }
    }
  }
  return times;
};
const TimeSelect = ({ duration }) => {
  const sessions = generateTimeBlocks(duration);
  return (
    <>
      <p className="font-weight-bold">Session time</p>
      <div className="d-flex flex-wrap mb-3">
        {sessions.map((time) => (
          <Button key={time} data-time={time} className="mr-1 mb-1" outline>
            {time}
          </Button>
        ))}
      </div>
    </>
  );
};

export default TimeSelect;
