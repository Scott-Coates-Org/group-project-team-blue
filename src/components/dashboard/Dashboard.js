import { Children, useState } from "react"
import { Nav, NavLink, NavItem, DropdownItem, Container, Row, Col, ListGroup, ListGroupItem, Badge, Collapse } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Dashboard.css"
import { faThLarge, faEnvelope, faCalendar, faTag, faUsers, faEdit, faTh, faCog } from "@fortawesome/free-solid-svg-icons"
import AdminNavbar from "components/navbar/Navbar"
import Sidebar from "components/sidebar/Sidebar"
import CreateProduct from "components/products/CreateProduct"
import Product from "components/products/Product"
import ProductList from "components/products/ProductList"
import { Switch, Route, useRouteMatch } from "react-router-dom"

const Dashboard = (props) => {
  const [isOpen, setIsOpen] = useState({all: [
    {id: 0, open: false},
    {id: 1, open: false},
    {id: 2, open: false}
]});
  let { path, url} = useRouteMatch();
  console.log(path)

  return (
    <>
      <AdminNavbar/>

      <Row className="row-admin">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} url={url}/>
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