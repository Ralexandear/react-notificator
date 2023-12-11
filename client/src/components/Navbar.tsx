import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button, Container, Form, Nav, Navbar, Offcanvas, Row} from 'react-bootstrap'


import { Context } from "../index.tsx";

import NavDropdown from 'react-bootstrap/NavDropdown';
import OrderTabs from './OrderTabs.tsx';

import './styles/navbar.sass'
import React from 'react';

const NavBar = observer(() => {
  //@ts-expect-error
  const { user } = useContext(Context);
  return (
    <>
    <Navbar key="false" expand="false" className="bg-body-tertiary mb-3">
      <Container >
        <Navbar.Brand href="/">
          <img
            src="/icons/notificatorLogo.svg"
            alt="notificator_logo" 
            id="notificatorLogo"
            style={{ maxWidth: '100px'}}
          />
        </Navbar.Brand>
        <OrderTabs id="tabs_desktop" />
        <Navbar.Toggle />
        {/* aria-controls={`offcanvasNavbar-expand-$"false"`} */}
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-$"false"`}
          aria-labelledby={`offcanvasNavbarLabel-expand-$"false"`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {user.username ?? 'username'}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#action1">Настройки</Nav.Link>
              <Nav.Link href="#action2">Выход</Nav.Link>
  
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
      <Container className='w-100 justify-content-center'>
        <Row>
          <OrderTabs id="tabs_mobile" />
        </Row>
      </Container>
    </Navbar>

  </>
  );
})

export default NavBar;

