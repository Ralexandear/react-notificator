import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';

const OrderTabs = ({ id }) => {
  return (
    <Navbar  >
      <Nav variant="pills" activeKey="1" id={ id }>
        <Nav.Item>
            <Button
              key="1"
              className="me-2"
              role="tab"
              // data-bs-toggle="tab"
              // type="button"
              variant="outline-green"
            >🧪 ДЦ / КК</Button>

        </Nav.Item>
        <Nav.Item >

            <Button
              // className="me-2"
              role="tab"
              // data-bs-toggle="tab"
              // type="button"
              variant="outline-green"
            >🛴 Самокат</Button>
        </Nav.Item>
      </Nav>
  </Navbar>
  )
};

export default OrderTabs







