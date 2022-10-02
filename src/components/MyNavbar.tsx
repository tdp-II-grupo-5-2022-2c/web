import React, {useState} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import '../assets/css/argon-dashboard-react.css'
import {Link} from "react-router-dom";
import {ROUTES} from "../routes/RoutesNames";

const MyNavbar = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand href="/">Figus Qatar</NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link to={ROUTES.HOME}>Home</Link>
            </NavItem>
            <NavItem>
              <Link to={ROUTES.MYSTICKERS}>Mis Figus</Link>
            </NavItem>
            <NavItem>
              <Link to={ROUTES.DAILYPACKET}>Paquete diario</Link>
            </NavItem>
            <NavItem>
              <Link to="/my-album">Mi Album</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
