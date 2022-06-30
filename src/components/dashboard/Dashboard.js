import { Children, createContext, useState } from "react"
import { Nav, NavLink, NavItem, DropdownItem, Container, Row, Col, ListGroup, ListGroupItem, Badge, Collapse } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Dashboard.css"
import { faThLarge, faEnvelope, faCalendar, faTag, faUsers, faEdit, faTh, faCog } from "@fortawesome/free-solid-svg-icons"
import AdminNavbar from "components/navbar/Navbar"
import Sidebar from "components/sidebar/Sidebar"
import CreateProduct from "components/products/CreateProduct"
import Product from "components/products/Product"
import ProductList from "components/products/ProductList"
import { Switch, Route, useRouteMatch, Router } from "react-router-dom"

export const userContext = createContext();

const Dashboard = (props) => {

  return (
    <>
      <AdminNavbar/>

      <Row className="row-admin">
        <Sidebar /* setIsOpen={setIsOpen} */ />
        <Col className="bg-light w-auto content " xs="10" style={{flex: 'auto'}}>
          <Switch>
            <Route exact path="/admin">
              <h3>Admin area</h3>
            </Route>
            <Route path="/admin/products">
              <ProductList/>
            </Route>
            <Route path="/admin/createproduct" >
              <CreateProduct/>
            </Route>
          </Switch>
          {/* <ProductList/> */}
        </Col>
        
      </Row>
    </>
    )
}


export default Dashboard