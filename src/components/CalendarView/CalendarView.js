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
import CalendarCell from './CalendarCell';
import { fetchAllProducts } from 'redux/product';
import { fetchAllBookings, fetchBookingByDate } from 'redux/booking';

export default function CalendarView() {
    const [startdate, setStartDate] = useState(new Date());
    const dispatch = useDispatch();
    const {data: roomdata, isLoaded, hasErrors} = useSelector((state) => state.room)
    const {data: timedata, isLoaded: timeisLoaded, hasErrors: timehasErrors} = useSelector((state) => state.opentime)
    const { data: productdata } = useSelector((state) => state.product)
    const { data: bookingdata } = useSelector((state) => state.booking)

    useEffect(() => {
        dispatch(fetchAllRooms());
        dispatch(fetchAllProducts());
        dispatch(fetchAllBookings());
        const mydate = format(startdate, "yyyy-MM-dd")
        firebase.firestore().collection('opentime').where("date", "==", mydate).get()
        .then((collections) => {
            const mydata = collections.docs.map(time => time.data())
            dispatch(getDataSuccess(mydata));
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
    // console.log(bookingdata)
    
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

    /*start */
    function timearr(duration, time) {
        let sesArr = [];
            for (let x = -duration/30 + 1; x < duration/30; x++){
                sesArr.push(eachCellTime(time, x))
            }
        return sesArr
    }



    function sessionCapacity() {
        const dateFilter = bookingdata.filter((value) => {
            return (value.order.bookingDate == '2022-07-28')
        })
        
        const finalObj = {}
        for (let prod of productdata) {

            if (prod.type == 'product') {
                const bookedProduct = []
                for (let product of dateFilter) {
                    for (let x of product.order.products) {
                        if (x.room?.name == prod?.room.name) {
                            bookedProduct.push(x)
                        } else if (x.room == null && x.title == 'All Day Pass') {
                            bookedProduct.push(x)
                        }
                    }
                }
                // console.log('booked', prod.title, bookedProduct)
                /*here I want the bookedProduct above to move and I will filter only the product.room.name == currentproduct.room.name */
                let proArr = []
                for (let sess of cell) {
                    let originalCellCapacity = prod?.room.capacity;
                    
                    if (prod.title.includes('All')) {
                        let impactedTimeSlot = cell
                    // console.log(impactedTimeSlot, sess, prod.title)
                        let impactedCapacity = []
                        for (let x of impactedTimeSlot) {
                            let slotCapacity = prod?.room.capacity
                            for (let p of bookedProduct) {
                                const session  = []
                                for (let i=0; i< p.duration / 30; i++) {
                                    session.push(eachCellTime(p.time, i))
                                }
                                if (session.includes(x) || p.title.includes('All')) {
                                    slotCapacity -= p.quantity
                                }
                            }
                            impactedCapacity.push(slotCapacity)
                        }
                        originalCellCapacity = Math.min(...impactedCapacity)
                        // proArr.push({time : sess, remainingCapacity: originalCellCapacity})
                    } else {
                        let impactedTimeSlot = timearr(prod.duration, sess)
                        let impactedCapacity = []
                        for (let x of impactedTimeSlot) {
                            let slotCapacity = prod?.room.capacity
                            for (let p of bookedProduct) {
                                const session  = []
                                for (let i=0; i< p.duration / 30; i++) {
                                    session.push(eachCellTime(p.time, i))
                                }
                                if (session.includes(x) || p.title.includes('All')) {
                                    slotCapacity -= p.quantity
                                    
                                    // console.log(cellCapacity - x.quantity, cellValue)
                                }
                            }
                            impactedCapacity.push(slotCapacity)
                            // console.log(prod.title,x, impactedCapacity.sort()[0])
                        }
                        originalCellCapacity = Math.min(...impactedCapacity)
                        // proArr.push({time: sess, remainingCapacity: originalCellCapacity})
                        // finalObj[`${prod.title}`]
                        
                    }
                    proArr.push({time : sess, remainingCapacity: originalCellCapacity})
                }
                finalObj[`${prod.title}`] = proArr
            //}
            }
            
        }
        console.log(finalObj)
    }
    sessionCapacity()
    /*end */

    return (
        <section style={{height: '100%'}}>
            <Card className='p-3 mb-3' style={{height: '30%'}}>
                <h5 className="text-muted">Bookings</h5>
                <h3 className="mb-5">Daily Capacity</h3>
                <DatePicker 
                selected={startdate}
                onChange={(date) => setStartDate(date)}
                onSelect={() => console.log(startdate)}
                />
            </Card>
            {!isLoaded && "Calendar loading..."}
            {hasErrors && "Error Loading"}
            {isLoaded && (
            <>
            <div className='section'>
            <Table bordered >
                <thead>
                    <tr>
                        <th className='tableh'></th>
                        {headers.map((value) => {
                            return (
                                <th key={value} className='tableh p-0' colSpan='2'>{value}</th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody className='tablegap'>
                    {roomdata.map((room) => {

                    return (
                    <tr key={room.name}>
                        <th className="pr-5" scope="row">{room.name}<br/><span className='fs-6 text-muted'>Holds {room.capacity} </span></th>
                        {cell.map((value, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <CalendarCell
                                        cellValue={value}
                                        productdata={productdata}
                                        roomdata={roomdata}
                                        currentRoom={room}
                                        bookingdata={bookingdata}
                                        datepick={startdate}
                                     />
                                </React.Fragment>
                            )
                        } )}
                    </tr>
                    )})}
                </tbody>
                
            </Table>
            </div>
            <div className='colorindicate mt-1'>
                <div className='colordiv mr-1' style={{backgroundColor: 'green'}}>
                </div>
                <span className='mr-3'>More than 50% Availability</span>
                <div className='colordiv mr-1' style={{backgroundColor: 'orange'}}>
                </div>
                <span className='mr-3'>less than 50% Availability</span>
                <div className='colordiv mr-1' style={{backgroundColor: '#d3d3d3'}}>
                </div>
                <span className='mr-3'>FullyBooked</span>
                <div className='colordiv mr-1' style={{backgroundColor: 'red'}}>
                </div>
                <span>OverBooked</span>

            </div>
            </>
            )}
        </section>
    )
}
