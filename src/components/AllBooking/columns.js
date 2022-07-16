import { Link } from "react-router-dom"

import React, {useState} from 'react'
import { Badge } from "reactstrap"
import { format } from "date-fns"

export const COLUMNS = [
    {
        Header: "BOOKING ID",
        accessor: "id",
        Cell: ({ value }) => { return <Link to={`/admin/bookings/${value}`}>{value}</Link>  }
    },
    {
        Header: "BOOKING DATE",
        accessor: "order.bookingDate",
        Cell: ({ value }) => format(new Date(value), 'M/d/yyyy')
    },
    {
        Header: "SESSION TIME",
        accessor: row => {
            let session = []
            row.order.products.map(product => session.push(product?.time))
            return session
        },
        Cell: ({value}) => 
        value.map(time  => {
            return <Badge className='mr-2 py-2' color="info" pill>{time}</Badge>
        }),
        sortType: "customTimeSort"
    },
    {
        Header: "HEADCOUNT",
        accessor: "participants.length"
    },
    {
        Header: "AMOUNT",
        accessor: row => {
        let sum = [];
        row.order.products.map(product => sum.push(product?.price))
        const total = sum.reduce(
            (sum, current) => sum + current,
            0
        )
        return total;
        }
    },
    {
        Header: "BOOKING NAME",
        accessor: row => `${row.customer?.first} ${row.customer?.last}`
    },
]