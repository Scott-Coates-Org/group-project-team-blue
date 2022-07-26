import { Link } from "react-router-dom"

import React, {useState} from 'react'
import { Badge } from "reactstrap"
import { format, formatISO } from "date-fns"

export const COLUMNS = [
    {
        Header: "BOOKING ID",
        accessor: "id",
        Cell: ({ value }) => { return <Link to={`/admin/bookings/${value}`}>{value}</Link>  }
    },
    {
        Header: "BOOKING DATE",
        accessor: row => { return formatISO(new Date(row.order.bookingDate))},
        Cell: ({ value }) => format(new Date(value), 'M/d/yyyy')
    },
    {
        Header: "SESSION TIME",
        accessor: row => {
            let session = []
            row.order.products.map(product => {
                if (product.type == 'product') {
                    session.push(product?.time)
                }
            })
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
            let total = row?.order.products.reduce(
                (sum, { price, quantity }) => sum + price * quantity,
                0
            )
        return (total + 5 + 0.05 * total).toFixed(2);
        }
    },
    {
        Header: "BOOKING NAME",
        accessor: row => `${row.customer?.first} ${row.customer?.last}`
    },
    {
        Header: "STATUS",
        accessor: 'status.type',
        Cell: ({value}) => {
            if (value == 'SUCCESS') {
                return <span className='text-success'>{value}</span>
            }
            return <span>{value}</span>
        }
        
    },
]
