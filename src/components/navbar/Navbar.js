import React from 'react'
import { Navbar, NavbarBrand, NavbarText, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem, NavLink } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretSquareDown, faBell, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import "./Navbar.css"

export default function AdminNavbar() {
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
              <FontAwesomeIcon icon={faBell} />
              <FontAwesomeIcon icon={faQuestionCircle} />
              <NavbarText className='n-text'>Jan3<br/>LoremLoremLorem</NavbarText>
              <FontAwesomeIcon icon={faCaretSquareDown} />
              
            </div>
            
        </Navbar>
    </>
  )
}
