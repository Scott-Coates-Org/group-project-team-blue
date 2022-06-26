import React from 'react'
import { Navbar, NavbarBrand, NavbarText, ListGroup, ListGroupItem, Collapse, Button } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretSquareDown, faBell, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import "./Navbar.css"
import { useState } from 'react'
import { history } from 'components/app'

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
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
    
    <>
        <Navbar
            className='text-white navbar-admin'
            color="dark"
            fixed='top'
            light
            >
            <span>Admin</span>
            <div className="navend">
              
              <a><FontAwesomeIcon icon={faBell} /></a>
              <a><FontAwesomeIcon icon={faQuestionCircle} /></a>
              <Button onClick={toggle} className="dominant bg-dark">
              <NavbarText className='nt text-white pt-0 disappear'>Jan3<br/>LoremLoremLorem</NavbarText>
              <FontAwesomeIcon icon={faCaretSquareDown} />
              </Button>
              <Collapse className='passive' isOpen={isOpen}>
                <ListGroup className="text-white">
                    <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="matchWidth bgdark border-0" onClick={() => history.push("/login")}>
                      Login
                    </ListGroupItem>
                    <ListGroupItem onMouseEnter={mouseover} onMouseLeave={onMouseOut} className="matchWidth bgdark border-0" onClick={() => history.push("/logout")}>
                      Logout
                    </ListGroupItem>
                </ListGroup>
            </Collapse>
              
            </div>
            
        </Navbar>
    </>
  )
}
