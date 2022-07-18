import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Table } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWaiversByBookingId } from 'redux/waiver';
import { fetchBookingById, getData, getDataSuccess } from 'redux/booking';
import { firebase } from 'firebase/client';


export default function BookingDetails() {
    const dispatch = useDispatch();
    const { id } = useParams()
     const {data, isLoaded, hasErrors} = useSelector(state => state.booking)
     const {data: waiverdata } = useSelector(state => state.waiver)

     console.log(waiverdata)

    console.log(bookingdata)
    const bookingdata = data.filter((booking) => {
        return booking.id == id
    })
     useEffect(() => {
        dispatch(fetchWaiversByBookingId({id : id}))
     }, [])

    return (
        <div className='container'>
             <h2 className='mb-3 text-center'>Booking Details for {id}</h2>
             <h5>Products And Addons:</h5>
             <Table borderless>
                 <thead>
                     <tr>
                         <th>Name</th>
                         <th>Type</th>
                         <th>Room</th>
                         <th>Time</th>
                         <th>Duration</th>
                         <th>Quantity</th>
                         <th>{"Price ($)"}</th>
                     </tr>
                 </thead>
                 <tbody>
                     {bookingdata[0]?.order.products.map((product) => {
                        return (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.type}</td>
                            <td>{product.room?.name ? product.room.name : '-'}</td>
                            <td>{product.time ? product.time: '-'}</td>
                            <td>{product.duration ? product.duration: '-'}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                         </tr>
                         )
                     }) 
                 }
                 </tbody>
             </Table>
             <h5>Customer Infomation</h5>
             <ul>
                 <li><strong>First Name:</strong> {bookingdata[0]?.customer?.first}</li>
                 <li><strong>Last Name:</strong> {bookingdata[0]?.customer?.last}</li>
                 <li><strong>Email:</strong> {bookingdata[0]?.customer?.email}</li>
                 <li><strong>Zip:</strong> {bookingdata[0]?.customer?.zip}</li>
                 <li><strong>Address:</strong> {bookingdata[0]?.customer?.address}</li>
             </ul>
             <h5>Checkout Information</h5>
             <ul>
                 <li><strong>Date:</strong> {bookingdata[0]?.stripe?.confirmDate}</li>
                 <li><strong>Amount:</strong> {bookingdata[0]?.stripe?.amount}</li>
                 <li><strong>Receipt Url:</strong> <a href={bookingdata[0]?.stripe?.receiptURL}> {bookingdata[0]?.stripe?.receiptURL}</a></li>
                 <li><strong>Transcation ID:</strong> {bookingdata[0]?.stripe?.transactionID}</li>
             </ul>
             <h5>Waiver</h5>
             {bookingdata[0]?.waiver &&  
             <ul>
                <li><strong>Name:</strong> {waiverdata[0]?.name}</li>
                <li><strong>Email:</strong> {waiverdata[0]?.email}</li>
                <li><strong>Date:</strong> {waiverdata[0]?.date}</li>
                 <li><strong>IP Address:</strong> {waiverdata[0]?.ipAddress}</li>
                 <li><strong>User Agent:</strong> {waiverdata[0]?.userAgent}</li>
                 <li><strong>Receipt Url:</strong> <a href={waiverdata[0]?.waiverURL}> {waiverdata[0]?.waiverURL}</a></li>
             </ul>}
            
        </div>
    )
}
