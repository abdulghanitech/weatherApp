import React, {Component} from "react";

import {Navbar, Nav} from "react-bootstrap";

class Header extends Component{


    render(){
        return(
            <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">Weather App</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
        
          </Navbar>
        );
    }

}

export default Header;