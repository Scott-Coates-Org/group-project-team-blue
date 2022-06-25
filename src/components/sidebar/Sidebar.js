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
]

const sdItems = [
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

const collapseItems = [
    {
        text: 'All products',
        path: '/'
    },
    {
        text: 'Create product',
        path: '/'
    },
    {
        text: 'Stack',
        path: '/'
    },
    {
        text: 'Discount codes',
        path: '/'
    },
    {
        text: 'Categories',
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
            {sidebarItems.map((item) => {
                return (
                    <ListGroupItem 
                        key={item.text} 
                        onClick={item.text == "Products" ? toogle : undefined} 
                        className="bgdark border-0" 
                        onMouseEnter={mouseover} onMouseLeave={onMouseOut}>
                            <span className="fa-li">{item.icon}</span>{item.text}
                            {item.text == "Inbox" && <Badge color='primary' pill>1</Badge> }
                        </ListGroupItem>
                )
            })}
            

            <Collapse isOpen={isOpen}>
                <ListGroup className="text-white">
                    {collapseItems.map((item) => {
                        return (
                            <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0">
                                {item.text}
                            </ListGroupItem>
                        )
                    })}

                </ListGroup>
            </Collapse>
            
            {sdItems.map((item) => {
                return (
                    <ListGroupItem key={item.text} onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="bgdark border-0">
                        <span class="fa-li">{item.icon}</span>{item.text}
                    </ListGroupItem>
                )
            })}

            
            </ListGroup>
        </Col>
  )
}
