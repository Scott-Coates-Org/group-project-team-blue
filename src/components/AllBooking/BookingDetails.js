import React from 'react'
import { useParams } from 'react-router-dom'

export default function BookingDetails() {

    const { id } = useParams()
    return (
        <div className='container'>
            <h2 className='mb-3 text-center'>Booking Details for {id}</h2>
            <h5>Products:</h5>
            <ul>
                <li>Product1</li>
                <li>Product2</li>
            </ul>
            <h5>Add ons:</h5>
            <ul>
                <li>Addon 1</li>
                <li>Addon 2</li>
            </ul>
            <h5>Customer Infomation</h5>
            <ul>
                <li>Name:</li>
                <li>Phone number:</li>
            </ul>
            <h5>Checkout Information</h5>
            <span>All checkout infos goes here</span>
        </div>
    )
}
