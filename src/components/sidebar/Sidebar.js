import React from 'react'
import { faThLarge, faEnvelope, faCalendar, faTag, faUsers, faEdit, faTh, faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Nav, NavLink, NavItem, DropdownItem, Container, Row, Col, ListGroup, ListGroupItem, Badge, Collapse } from "reactstrap"
import "../dashboard/Dashboard.css"
import { useState } from 'react'

const sidebarItems = [
    {
        text: 'Dashboard',
        icon: <FontAwesomeIcon icon={faThLarge} />,
        path: '/'
    },
    {
        text: 'Inbox',
        icon: <FontAwesomeIcon icon={faEnvelope} />,
        path: '/create'
    },
    {
        text: 'Bookings',
        icon: <FontAwesomeIcon icon={faCalendar} />,
        path: '/'
    },
    {
        text: 'Products',
        icon: <FontAwesomeIcon icon={faTag} />,
        path: '/'
    },
    {
        text: 'Customers',
        icon: <FontAwesomeIcon icon={faUsers} />,
        path: '/'
    },
    {
        text: 'Reports',
        icon: <FontAwesomeIcon icon={faEdit} />,
        path: '/'
    },
    {
        text: 'Apps',
        icon: <FontAwesomeIcon icon={faTh} />,
        path: '/'
    },
    {
        text: 'Settings',
        icon: <FontAwesomeIcon icon={faCog} />,
        path: '/'
    },
]

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(false);
    const toogle = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    }
    const mouseover = (e) => {
        e.target.style.background = "#0a0b0c";
    }
    const onMouseOut = (e) => {
        e.target.style.background = "#343a40";
    }


    return (
    <Col className="sidebar bg-dark border-0 text-white" xs="2">
        <ListGroup className="text-white mt-3 fa-ul">
            {/*sidebarItems.map((item) => {
                return (
                    <ListGroupItem key={item.text} onClick={item.text == "Products" ? toogle : undefined} className="bg-dark border-0">
                        <span className="fa-li">{item.icon}</span>{item.text}
                        {item.text == "Inbox" && <Badge color='primary' pill>1</Badge> }
                    </ListGroupItem>
                )
            })*/}
            <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0">
                <span class="fa-li"><FontAwesomeIcon icon={faThLarge} /></span>Dashboard
            </ListGroupItem>
            <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0">
                <span class="fa-li"><FontAwesomeIcon icon={faEnvelope} /></span>Inbox
                <Badge color='primary' pill>1</Badge>
            </ListGroupItem>
            <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0">
                <span class="fa-li"><FontAwesomeIcon icon={faCalendar} /></span>Bookings
            </ListGroupItem>
            <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} onClick={toogle} className="bgdark border-0 ">
                <span class="fa-li"><FontAwesomeIcon icon={faTag} /></span>Products
        </ListGroupItem>

            <Collapse isOpen={isOpen}>
                <ListGroup className="text-white">
                    <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0">
                    All Products
                    </ListGroupItem>
                    <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0">
                    Create Product 
                    </ListGroupItem>
                    <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0 ">
                    Stack
                    </ListGroupItem>
                    <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0 ">
                    Discount codes
                    </ListGroupItem>
                    <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0 ">
                    Categories
                    </ListGroupItem>
                </ListGroup>
            </Collapse>
            

            <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0">
                <span class="fa-li"><FontAwesomeIcon icon={faUsers} /></span>Customers
            </ListGroupItem>
            <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0">
                <span class="fa-li"><FontAwesomeIcon icon={faEdit} /></span>Reports 
            </ListGroupItem>
            <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0 ">
                <span class="fa-li"><FontAwesomeIcon icon={faTh} /></span>Apps
            </ListGroupItem>
            <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0 ">
                <span class="fa-li"><FontAwesomeIcon icon={faCog} /></span>Settings
            </ListGroupItem>
            </ListGroup>
        </Col>
  )
}
