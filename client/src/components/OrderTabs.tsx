import React, { useContext } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Context } from "../index.tsx";
import { OrderType } from '../store/OrderStore.ts';
import { observer } from 'mobx-react-lite';



const OrderTabs = observer (({ id }) => {
  const { order } = useContext(Context);

  return (
    <Navbar  >
      <Nav variant="pills" activeKey="1" id={ id }>
        <Nav.Item>
            <Button
              key="1"
              className={`me-2 ${(order.orderType === 'antigen') && "active"}`}
              role="tab"
              // data-bs-toggle="tab"
              // type="button"
              variant="outline-green"
              onClick={() => switchOrderType('antigen')}
            >🧪 ДЦ / КК</Button>
        </Nav.Item>
        <Nav.Item >
            <Button
              className={`${(order.orderType === 'scooter') && "active"}`}
              role="tab"
              // data-bs-toggle="tab"
              // type="button"
              variant="outline-green"
              onClick={() => switchOrderType('scooter')}
            >🛴 Самокат</Button>
        </Nav.Item>
      </Nav>
  </Navbar>
  )

  function switchOrderType (orderType: OrderType) {
    order.setOrderType(orderType);
  }
});

export default OrderTabs







