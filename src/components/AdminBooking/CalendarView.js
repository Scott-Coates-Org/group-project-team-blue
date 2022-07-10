import React, {useEffect, useState} from 'react'
import DatePicker from "react-datepicker";
import { Card, Table } from 'reactstrap';
import hoursToSeconds from 'date-fns/hoursToSeconds';

import "react-datepicker/dist/react-datepicker.css";
import "./CalendarView.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms } from 'redux/room';
import { fetchOpenTimes, getDataSuccess } from 'redux/opentime';
import { format, millisecondsToMinutes, minutesToSeconds, secondsToHours } from 'date-fns';
import { firebase } from 'firebase/client';

export default function CalendarView() {
    const [startdate, setStartDate] = useState(new Date());
    const dispatch = useDispatch();
    const {data, isLoaded, hasErrors} = useSelector((state) => state.room)
    const {data: timedata, isLoaded: timeisLoaded, hasErrors: timehasErrors} = useSelector((state) => state.opentime)
    // console.log(timedata)
    // console.log(data)

    useEffect(() => {
        dispatch(fetchAllRooms());
        // dispatch(fetchOpenTimes());
        const mydate = format(startdate, "yyyy-MM-dd")
        firebase.firestore().collection('opentime').where("date", "==", mydate).get()
        .then((collections) => {
            const mydata = collections.docs.map(time => time.data())
            dispatch(getDataSuccess(mydata));
            console.log(timedata)
        })
    }, [dispatch, startdate]);

    const open = timedata[0]?.open;
    const close = timedata[0]?.close;
    const date = timedata[0]?.date;
    const cell = [];
    const openHour = new Date(`${date}T${open}:00Z`)
    const closeHour = new Date(`${date}T${close}:00Z`)
    const totalOpenTime = closeHour.getTime() - openHour.getTime()
    const noOfCells = millisecondsToMinutes(totalOpenTime) / 30;
    
    // let openDateObj = new Date(parseInt(dateArr[0]),parseInt(dateArr[1])-1,parseInt(dateArr[2]),parseInt(opentimeArr[0]),parseInt(opentimeArr[1]))
    // let closeDateObj = new Date(parseInt(dateArr[0]),parseInt(dateArr[1])-1,parseInt(dateArr[2]),parseInt(closetimeArr[0]),parseInt(closetimeArr[1]))
    // const totaltime = closeDateObj - openDateObj;
    // console.log(totaltime)
    // let noOfCells = parseInt(close?.split(':')[0]) - parseInt(open?.split(':')[0]);
    for (let i=0; i < noOfCells; i++ ) {
        cell.push(i);
    }
    const headers = cell.slice(0, Math.round(cell.length / 2))

    function timeadd(time, plus) {
        let hr = parseInt(time?.split(':')[0]);
        let min = time?.split(':')[1];
        let inseconds = hoursToSeconds(hr) + minutesToSeconds(min) + plus*3600;
        let newtime = secondsToHours(inseconds)
        return newtime + `:${min}`
    }

    return (
        <section style={{height: '65%'}}>
            <Card className='p-3 mb-3'>
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
            <div className='section'>
            <Table bordered>
                <thead>
                    <tr>
                        <th className='tableh'></th>
                        {headers.map((num) => {
                            return (
                                <th className='tableh p-0' colSpan='2'>{timeadd(open, num)}</th>
                            )
                        })}
                    </tr>
                </thead>
                
                
                <tbody>
                    {data.map((room) => {

                    return (
                    <tr key={room.name}>
                        <th className="pr-5" scope="row">{room.name}<br/><span className='fs-6 text-muted'>Holds {room.capacity} </span></th>
                        {cell.map((value, index) => {
                            return (
                                <React.Fragment key={value}>
                                <td className="p-0"><div className="cell">content</div></td>
                                </React.Fragment>
                            )
                        } )}
                    </tr>
                    )})}
                </tbody>
                
            </Table>
            </div>
            )}
        </section>
    )
}
