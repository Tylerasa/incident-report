import React, { useState, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import { Link } from "react-router-dom"

import AppModal from "./AppModal";


const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [logout, setLogout] = useState(0);
  let logged = localStorage.getItem('logged')
  const logoutFunc = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.setItem('logged', 0)
 

  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Incident Report System</NavbarBrand>
        
      </Navbar>
    </div>
  );
};

export default NavBar;
