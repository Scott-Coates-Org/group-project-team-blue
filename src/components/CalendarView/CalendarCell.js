import { format } from 'date-fns';
import React, {useEffect, useState} from 'react'
import { millisecondsToMinutes, minutesToSeconds, secondsToHours, secondsToMinutes } from 'date-fns';
import hoursToSeconds from 'date-fns/hoursToSeconds';

export default function CalendarCell(props) {
    const { cellValue, productdata, roomdata, currentRoom, bookingdata, datepick} = props;
    const [cellCapacity, setCellCapacity ] = useState(roomdata[0].capacity);
    const dateFilter = bookingdata.filter((value) => {
        return (value.order.bookingDate == format(datepick, 'M/d/yyyy'))
    })
//     const roomFilter = dateFilter.filter((value) => {
//         return (value.order.products.room == currentRoom)
// })
    //console.log(dateFilter)
    const arr = []
    
    // const testing = () => {
    for (let product of dateFilter) {
        for (let x of product.order.products) {
            if (x.room != null) {
                arr.push(x)
            }
        }
    }

// testing();

useEffect(() => {
    setCellCapacity(roomdata[0].capacity)
    hello()
}, [datepick])


const hello = () => {
    for (let x of arr) {
        console.log("loop start", cellCapacity)
        const session  = []
        for (let i=0; i< x.duration / 30; i++) {
            session.push(eachCellTime(x.time, i))
        }
        if (session.includes(cellValue)) {
            setCellCapacity((cellCapacity) => cellCapacity - x.quantity)
            console.log(cellCapacity - x.quantity, cellValue)
        }
    }
}


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







    // for (let x of arr) {
    //     for (let i=0; i < x.duration/30; i++ ) {
    //         if(session.some(e => e.time == eachCellTime(x.time, i))) {
    //             console.log("hello");
    //             for (let y of x) {
                    
    //             }
    //             //session.currentTime.push(currentQuantity += x.quantity);
    //         }
    //         session.push({
    //             time: eachCellTime(x.time, i),
    //             quantity: x.quantity
    //         });
    //     }
    // }

    // console.log(session);

    /* for (let y of session) {
        totalTaken
    } */





    return (
        <td className="p-0"><div className="cell">contains {cellCapacity}</div></td>
    )
}