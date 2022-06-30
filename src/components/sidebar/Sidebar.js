import React, { useContext, useEffect } from 'react'
import { faThLarge, faEnvelope, faCalendar, faTag, faUsers, faEdit, faTh, faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Nav, NavLink, NavItem, DropdownItem, Container, Row, Col, ListGroup, ListGroupItem, Badge, Collapse, Button } from "reactstrap"
import "../dashboard/Dashboard.css"
import { useState } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import SidebarCollapse from './SidebarCollapse'
import { userContext } from 'components/dashboard/Dashboard'

const sidebarItems = [
    {
        id: 0,
        text: 'Products',
        icon: <FontAwesomeIcon icon={faTag} />,
        path: '/admin',
        collapse: [
            {
                text: 'All products',
                path: '/admin/products'
            },
            {
                text: 'Create product',
                path: '/admin/createproduct'
            },
        ]
    },
    {
        id: 1,
        text: 'Bookings',
        icon: <FontAwesomeIcon icon={faCalendar} />,
        path: '/admin',
        collapse: [
            {
                text: 'All bookings',
                path: '/admin/bookings'
            },
            {
                text: 'Create bookings',
                path: '/admin/createbooking'
            },
        ]
    },
    
    {
        id: 2,
        text: 'Rooms',
        icon: <FontAwesomeIcon icon={faTh} />,
        path: '/admin',
        collapse: [
            {
                text: 'All Rooms',
                path: '/admin/rooms'
            },
            {
                text: 'Create rooms',
                path: '/admin/createbooking'
            },
        ]
    },
]



export default function Sidebar(props) {
    const history = useHistory();
    const location = useLocation();


    
    const mouseover = (e) => {
        e.target.style.background = "#0a0b0c";
    }
    const onMouseOut = (e) => {
        e.target.style.background = "";
    }


    return (
    <Col className="sidebar p-0 bg-dark border-0 text-white" xs="2">
        
        <ListGroup className="text-white mt-3 fa-ul">
            <SidebarCollapse item={sidebarItems[0]} mouseover={mouseover} onMouseOut={onMouseOut}/>

            <SidebarCollapse item={sidebarItems[1]} mouseover={mouseover} onMouseOut={onMouseOut}/>

            <SidebarCollapse item={sidebarItems[2]} mouseover={mouseover} onMouseOut={onMouseOut}/>
            
            <ListGroupItem onMouseOver={mouseover} onMouseOut={onMouseOut} className="bgdark border-0">
                        <span className="fa-li"><FontAwesomeIcon icon={faCog} /></span>Settings
            </ListGroupItem>

        </ListGroup>
    </Col>
  )
}
