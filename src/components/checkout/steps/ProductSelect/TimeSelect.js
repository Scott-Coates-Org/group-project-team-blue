import { Button } from 'reactstrap';

// Calculate the number of minutes between opening and closing hours. In this case: 10.00-20.00 (10AM-8PM)
// const generateTimeBlocks = (duration) => {
//   let times = [];
//   const startTime = 10;

//   // Generates array of time strings from hours and a set time of day (eg. am, pm)
//   const parseTime = (hh, timeOfDay) => {
//     const min = ((hh * 10) % 10) / 10;
//     const hour = hh - min;
//     const time = `${hour}:${min * 6}0`;
//     times.push(time);
//   };

//   if (duration === 60) {
//     for (let i = startTime; i < 20; i++) {
//       if (i < 12) {
//         parseTime(i);
//       } else if (i === 12) {
//         parseTime(i);
//       } else {
//         parseTime(i);
//       }
//     }
//   }
//   // Given a 90 min long activity, the last slot should end at 7.00pm at the latest
//   if (duration === 90) {
//     for (let i = startTime; i < 19; i += 1.5) {
//       if (i < 12) {
//         parseTime(i);
//       } else if (i === 12) {
//         parseTime(i);
//       } else {
//         parseTime(i);
//       }
//     }
//   }
//   if (duration === 120) {
//     for (let i = startTime; i < 20; i += 2) {
//       if (i < 12) {
//         parseTime(i);
//       } else if (i === 12) {
//         parseTime(i);
//       } else {
//         parseTime(i);
//       }
//     }
//   }
//   return times;
// };

const TimeSelect = ({ duration, id, timeSlots, handleSetTime }) => {
  // const sessions = generateTimeBlocks(duration);

  const determineAvailability = (duration, time, times) => {
    switch (true) {
      case (duration === 120):
        return time.remainingCapacity === 0 || times[time.idx + 1]?.remainingCapacity === 0 || times[time.idx + 2]?.remainingCapacity === 0 || times[time.idx + 3]?.remainingCapacity === 0 ? true : false;
      case (duration === 90):
        return time.remainingCapacity === 0 || times[time.idx + 1]?.remainingCapacity === 0 || times[time.idx + 2]?.remainingCapacity === 0 ? true : false;
      case (duration === 60):
        return time.remainingCapacity === 0 || times[time.idx + 1]?.remainingCapacity === 0 ? true : false;
    }
  };

  return (
    <>
      {/* <p className="font-weight-bold">Session time</p>
      <div role="group" data-toggle="buttons" className="d-flex flex-wrap mb-3">
        {sessions.map((time, idx) => (
          <Button
            data-toggle="button"
            key={time}
            className="mr-1 mb-1"
            onClick={() => handleSetTime(id, time)}
            outline
          >
            {time}
          </Button>
        ))}
      </div> */}
      <p>test</p>
      { timeSlots.length ? (
      <div role="group" data-toggle="buttons" className="d-flex flex-wrap mb-3">

        {timeSlots.map((time, index, times) => {
          return (
            <Button
              data-toggle="button"
              key={time.idx}
              className="mr-2 mb-2"
              onClick={() => handleSetTime(id, time.time)}
              disabled={determineAvailability(duration, time, times)}
            >
              {time.time}
            </Button>
          )
        })}
      </div>) : (<p>nothing to see</p>)}
    </>
  );
};

export default TimeSelect;
