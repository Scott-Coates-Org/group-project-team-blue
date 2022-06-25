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
        <Col className="bg-light content" xs="10">
          <p>hello world</p>
        </Col>
      </Row>
    </>
    )
}


export default Dashboard