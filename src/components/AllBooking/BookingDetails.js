import React from 'react'
import { useParams } from 'react-router-dom'
import { Table } from 'reactstrap'
import { useSelector } from 'react-redux'

export default function BookingDetails() {
    const {data, isLoaded, hasErrors} = useSelector(state => state.booking)
    const { id } = useParams()
    console.log(data)
    const bookingdata = data.filter((booking) => {
        return booking.id == id
    })
    console.log('bookingdata', bookingdata)

    return (
        <div className='container'>
            <h2 className='mb-3 text-center'>Booking Details for {id}</h2>
            <h5>Products And Addons:</h5>
            {!isLoaded && "Products loading..."}
            {hasErrors && "Error Loading"}
            {isLoaded && (
            <>
            <Table borderless>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Room</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingdata[0].orders.products?.map((product) => {
                        return (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.type}</td>
                            <td>{product.room?.name}</td>
                            <td>{product.time}</td>
                            <td>{product.duration}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                        </tr>
                        )
                    }) 
                    }   
                </tbody>
            </Table>
            <h5>Customer Infomation</h5>
            {bookingdata[0].customer.first && <ul>
                <li>First Name: {bookingdata[0].customer.first}</li>
                <li>Last Name: {bookingdata[0].customer.last}</li>
                <li>Email: {bookingdata[0].customer.email}</li>
                <li>Zip: {bookingdata[0].customer.zip}</li>
                <li>Address: {bookingdata[0].customer.address}</li>
            </ul>}
            <h5>Checkout Information</h5>
            {bookingdata[0].stripe.amount && 
            <ul>
                <li>Date: {bookingdata[0].stripe.confirmDate}</li>
                <li>Amount: {bookingdata[0].stripe.amount}</li>
                <li>Receipt Url: {bookingdata[0].stripe.receiptURL}</li>
                <li>transaction ID: {bookingdata[0].stripe.transactionID}</li>
            </ul>}
            </>)}
        </div>
    )
}
