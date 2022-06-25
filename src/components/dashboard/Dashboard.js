import { useState } from "react"
import { Nav, NavLink, NavItem, DropdownItem, Container, Row, Col, ListGroup, ListGroupItem, Badge, Collapse } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Dashboard.css"
import { faThLarge, faEnvelope, faCalendar, faTag, faUsers, faEdit, faTh, faCog } from "@fortawesome/free-solid-svg-icons"
import AdminNavbar from "components/navbar/Navbar"
import Sidebar from "components/sidebar/Sidebar"

const Dashboard = (props) => {
  

  return (
    <>
      <AdminNavbar/>
      <Row>
        <Sidebar/>
        {/*<Col className="sidebar bg-dark border-0 text-white" xs="2">
          <ListGroup className="text-white mt-3 fa-ul">
            <ListGroupItem className="bg-dark border-0">
              <span class="fa-li"><FontAwesomeIcon icon={faThLarge} /></span>Dashboard
            </ListGroupItem>
            <ListGroupItem className="bg-dark border-0">
              <span class="fa-li"><FontAwesomeIcon icon={faEnvelope} /></span>Inbox
              <Badge color='primary' pill>1</Badge>
            </ListGroupItem>
            <ListGroupItem className="bg-dark border-0">
              <span class="fa-li"><FontAwesomeIcon icon={faCalendar} /></span>Bookings
            </ListGroupItem>
            <ListGroupItem  onClick={toogle} className="bg-dark border-0 ">
              <span class="fa-li"><FontAwesomeIcon icon={faTag} /></span>Products
            </ListGroupItem>

            <Collapse isOpen={isOpen}>
              <ListGroup className="text-white">
                <ListGroupItem className="bg-dark border-0">
                  All Products
                </ListGroupItem>
                <ListGroupItem className="bg-dark border-0">
                  Create Product 
                </ListGroupItem>
                <ListGroupItem className="bg-dark border-0 ">
                  Stack
                </ListGroupItem>
                <ListGroupItem className="bg-dark border-0 ">
                  Discount codes
                </ListGroupItem>
                <ListGroupItem className="bg-dark border-0 ">
                  Categories
                </ListGroupItem>
              </ListGroup>
            </Collapse>
            

            <ListGroupItem className="bg-dark border-0">
              <span class="fa-li"><FontAwesomeIcon icon={faUsers} /></span>Customers
            </ListGroupItem>
            <ListGroupItem className="bg-dark border-0">
              <span class="fa-li"><FontAwesomeIcon icon={faEdit} /></span>Reports 
            </ListGroupItem>
            <ListGroupItem className="bg-dark border-0 ">
              <span class="fa-li"><FontAwesomeIcon icon={faTh} /></span>Apps
            </ListGroupItem>
            <ListGroupItem className="bg-dark border-0 ">
              <span class="fa-li"><FontAwesomeIcon icon={faCog} /></span>Settings
            </ListGroupItem>
          </ListGroup>
  </Col>*/}
        <Col className="bg-light content" xs="10">
          <p>hi i change</p>
        </Col>
      </Row>
    </>
    )
}


export default Dashboard