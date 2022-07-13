import React, {useEffect, useState} from 'react'
import DatePicker from "react-datepicker";
import { Card, Table } from 'reactstrap';
import hoursToSeconds from 'date-fns/hoursToSeconds';

import "react-datepicker/dist/react-datepicker.css";
import "./CalendarView.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms } from 'redux/room';
import { fetchOpenTimes, getDataSuccess } from 'redux/opentime';
import { format, millisecondsToMinutes, minutesToSeconds, secondsToHours, secondsToMinutes } from 'date-fns';
import { firebase } from 'firebase/client';
import BOOKING from "../datasrc.json"
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import CalendarCell from './CalendarCell';

export default function CalendarView() {
    const [startdate, setStartDate] = useState(new Date());
    const dispatch = useDispatch();
    const {data, isLoaded, hasErrors} = useSelector((state) => state.room)
    const {data: timedata, isLoaded: timeisLoaded, hasErrors: timehasErrors} = useSelector((state) => state.opentime)
    const { data: productdata } = useSelector((state) => state.product)
    // console.log(productdata)

    useEffect(() => {
        dispatch(fetchAllRooms());
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

    for (let i=0; i < noOfCells; i++ ) {
        cell.push(eachCellTime(open, i));
    }
    const headers = cell.filter((value, index) => index % 2 == 0)
    console.log(headers)

    // function timeadd(time, plus) {
    //     let hr = time?.split(':')[0];
    //     let min = time?.split(':')[1];
    //     let inseconds = hoursToSeconds(hr) + minutesToSeconds(min) + plus*3600;
    //     let newtime = secondsToHours(inseconds)
    //     return newtime + `:${min}`
    // }
    function eachCellTime(time, plus) {
        let hr = time?.split(':')[0];
        let min = time?.split(':')[1];
        let inseconds = hoursToSeconds(hr) + minutesToSeconds(min) + plus * 1800;
        let newtime = secondsToHours(inseconds)
        if (inseconds % 3600 != 0) {
            return newtime +":"+ secondsToMinutes(inseconds % 3600)
        }
        return newtime+ ':00'
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
                        {headers.map((value) => {
                            return (
                                <th className='tableh p-0' colSpan='2'>{value}</th>
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
                                    <CalendarCell />
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
