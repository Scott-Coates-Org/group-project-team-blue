import { Link } from "react-router-dom"

export const COLUMNS = [
    {
        Header: "BOOKING ID",
        accessor: "OrderID",
        Cell: ({ value }) => { return <Link to={`/admin/bookings/${value}`}>{value}</Link>  }
    },
    {
        Header: "BOOKING DATE",
        accessor: "BookingDate"
    },
    {
        Header: "SESSION TIME",
        accessor: "SessionTime"
    },
    {
        Header: "HEADCOUNT",
        accessor: "HeadCount"
    },
    {
        Header: "AMOUNT",
        accessor: "Amount"
    },
    {
        Header: "BOOKING NAME",
        accessor: "ShipName"
    },
]