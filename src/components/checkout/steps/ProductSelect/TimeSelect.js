import { Button } from 'reactstrap';

const TimeSelect = ({ duration, id, timeSlots, handleSetTime }) => {

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
      </div>
    </>
  );
};

export default TimeSelect;
