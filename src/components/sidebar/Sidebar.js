import React, { useEffect } from 'react'
import { faThLarge, faEnvelope, faCalendar, faTag, faUsers, faEdit, faTh, faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Nav, NavLink, NavItem, DropdownItem, Container, Row, Col, ListGroup, ListGroupItem, Badge, Collapse, Button } from "reactstrap"
import "../dashboard/Dashboard.css"
import { useState } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import SidebarCollapse from './SidebarCollapse'

const sidebarItems = [
    // {
    //     text: 'Dashboard',
    //     icon: <FontAwesomeIcon icon={faThLarge} />,
    //     path: '/'
    // },
    // {
    //     text: 'Inbox',
    //     icon: <FontAwesomeIcon icon={faEnvelope} />,
    //     path: '/create'
    // },
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

// const sdItems = [
//     {
//         text: 'Customers',
//         icon: <FontAwesomeIcon icon={faUsers} />,
//         path: '/'
//     },
//     {
//         text: 'Reports',
//         icon: <FontAwesomeIcon icon={faEdit} />,
//         path: '/'
//     },
//     {
//         text: 'Apps',
//         icon: <FontAwesomeIcon icon={faTh} />,
//         path: '/'
//     },
//     {
//         text: 'Settings',
//         icon: <FontAwesomeIcon icon={faCog} />,
//         path: '/'
//     },
// ]

// const collapseItems = [
//     {
//         text: 'All products',
//         path: '/'
//     },
//     {
//         text: 'Create product',
//         path: '/'
//     },
//     {
//         text: 'Stack',
//         path: '/'
//     },
//     {
//         text: 'Discount codes',
//         path: '/'
//     },
//     {
//         text: 'Categories',
//         path: '/'
//     },
// ]

export default function Sidebar(props) {
    const history = useHistory();
    const location = useLocation();
    const {isOpen, setIsOpen, url} = props;
    const [state, setState] = useState(false);

    // const [isOpen, setIsOpen] = useState({all: [
    //     {id: 0, open: false},
    //     {id: 1, open: false},
    //     {id: 2, open: false}
    // ]});

    useEffect(() => {
        console.log(state)
    }, [state])

    const toggle = (id) => {
        console.log('called')
        setIsOpen(isOpen => ({
            ...isOpen,
            all: isOpen.all.map((item) => 
            item.id == id ? {...item, open: !item.open} : item
        )
        }))
    }
    
    const mouseover = (e) => {
        e.target.style.background = "#0a0b0c";
    }
    const onMouseOut = (e) => {
        e.target.style.background = "";
    }


    return (
    <Col className="sidebar bg-dark border-0 text-white" xs="2">
        <ListGroup className="text-white mt-3 fa-ul">
            {sidebarItems.map((item) => {
                return (
                    <React.Fragment key={item.id} >
                    <ListGroupItem 
                        onClick={() => toggle(item.id)}
                        className={`bgdark border-0 ${location.pathname == item.path ? "active" : null}` }
                        onMouseOver={mouseover} onMouseOut={onMouseOut}>
                            <span className="fa-li">{item.icon}</span>{item.text}
                            {item.text == "Inbox" && <Badge color='primary' pill>1</Badge> }
                        </ListGroupItem>
                        <Collapse isOpen={isOpen.all[item.id].open}>
                            <SidebarCollapse url={url} item={item} mouseover={mouseover} onMouseOut={onMouseOut}/>
                        {/* <ListGroup className="text-white">
                            {item.collapse.map((item) => {
                                return (
                                    <ListGroupItem onClick={(e) => {
                                        // history.push(item.path);
                                    }} key={item.id} onMouseOver={mouseover} onMouseOut={onMouseOut} className="bgdark border-0">
                                        {item.text}
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup> */}
                    </Collapse>
                    </React.Fragment>
                )
            })}
            <ListGroupItem onMouseOver={mouseover} onMouseOut={onMouseOut} className="bgdark border-0">
                        <span className="fa-li"><FontAwesomeIcon icon={faCog} /></span>Settings
            </ListGroupItem>

            {/* <Collapse isOpen={isOpen}>
                <ListGroup className="text-white">
                    {collapseItems.map((item) => {
                        return (
                            <ListGroupItem onMouseOver={mouseover} onMouseOut={onMouseOut} className="bgdark border-0">
                                {item.text}
                            </ListGroupItem>
                        )
                    })}

                </ListGroup>
            </Collapse>
            
            {sdItems.map((item) => {
                return (
                    <ListGroupItem key={item.text} onMouseOver={mouseover} onMouseOut={onMouseOut} className="bgdark border-0">
                        <span class="fa-li">{item.icon}</span>{item.text}
                    </ListGroupItem>
                )
            })} */}
            <ListGroupItem onClick={() => setState(!state)} onMouseOver={mouseover} onMouseOut={onMouseOut} className="bgdark border-0">
                Hello
            </ListGroupItem>
            <Collapse isOpen={state}>
            <ListGroupItem onMouseOver={mouseover} onMouseOut={onMouseOut} className="bgdark border-0">
                <Link to="/admin/products">HI</Link>
            </ListGroupItem>
            <ListGroupItem onMouseOver={mouseover} onMouseOut={onMouseOut} className="bgdark border-0">
                HI
            </ListGroupItem>
            </Collapse>

            
            </ListGroup>
        </Col>
  )
}
