import React, {useEffect, useState} from 'react'
import DatePicker from "react-datepicker";
import { Card, Table } from 'reactstrap';
import hoursToSeconds from 'date-fns/hoursToSeconds';

import "react-datepicker/dist/react-datepicker.css";
import "./CalendarView.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms } from 'redux/room';
import { fetchOpenTimes } from 'redux/opentime';
import { format, minutesToSeconds, secondsToHours } from 'date-fns';

export default function CalendarView() {
    const [startdate, setStartDate] = useState(new Date());
    const dispatch = useDispatch();
    const {data, isLoaded, hasErrors} = useSelector((state) => state.room)
    const {timedata, timeisLoaded, timehasErrors} = useSelector((state) => state.opentime)
    // console.log(timedata)
    // console.log(data)
    console.log(format(startdate, 'yyyy-MM-dd'));

    useEffect(() => {
        console.log("called")
        dispatch(fetchAllRooms());
        dispatch(fetchOpenTimes());
    }, [dispatch]);

    const open = timedata[0]?.open;
    const close = timedata[0]?.close;
    const cell = [];
    let noOfCells = parseInt(close?.split(':')[0]) - parseInt(open?.split(':')[0]);
    for (let i=0; i <= noOfCells; i++ ) {
        cell.push(i);
    }

    function timeadd(time, plus) {
        let hr = parseInt(time.split(':')[0]);
        let min = time.split(':')[1];
        let inseconds = hoursToSeconds(hr) + minutesToSeconds(min) + plus*3600;
        let newtime = secondsToHours(inseconds)
        return newtime + `:${min}`
    }

    return (
        <section>
            <Card className='p-3 w-100'>
                <h5 className="text-muted">Bookings</h5>
                <h3 className="mb-5">Daily Capacity</h3>
                <DatePicker 
                selected={startdate}
                onChange={(date) => setStartDate(date)}
                onSelect={() => console.log(startdate)}
                />
            </Card>
            {!isLoaded && "Products loading..."}
            {hasErrors && "Error Loading"}
            {isLoaded && (
            <Table bordered>
                <thead>
                    <tr>
                        <th></th>
                        {cell.map((num) => {
                            return (
                                <th colSpan='2'>{timeadd(open, num)}</th>
                            )
                        })}
                    </tr>
                </thead>
                
                
                <tbody>
                    {data.map((room) => {

                    return (
                    <tr key={room.name}>
                        <th className="pr-5" scope="row">{room.name}<br/><span className='fs-6 text-muted fw-light'>Holds {room.capacity} </span></th>
                        {cell.map((value, index) => {
                            return (
                                <React.Fragment key={value}>
                                <td className="p-0"><div className="cell">content</div></td>
                                <td className="p-0"><div className="cell">content</div></td>
                                </React.Fragment>
                            )
                        } )}
                    </tr>
                    )})}
                </tbody>
                
            </Table>
            )}
        </section>
    )
}
