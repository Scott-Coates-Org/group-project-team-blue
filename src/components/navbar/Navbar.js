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
              <a><FontAwesomeIcon icon={faBell} /></a>
              <a><FontAwesomeIcon icon={faQuestionCircle} /></a>
              <a><NavbarText className='text-white pt-0 disappear'>Jan3<br/>LoremLoremLorem</NavbarText></a>
              <a><FontAwesomeIcon icon={faCaretSquareDown} /></a>
              
            </div>
            
        </Navbar>
    </>
  )
}
