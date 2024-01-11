import React, { useContext } from "react";
import { Container, Form, Row } from "react-bootstrap";
import MessageForm from "../components/MessageForm.tsx";
import OrderPropertiesForm from "../components/OrderPropertiesForm.tsx";
import { Context } from "../index.tsx";

const Dashboard = () => {
  const { user } = useContext(Context);
  console.log('dash')

  return (
    <Container>
      <Form
        className="d-flex"
      >
       
      {/* <div
        className="grid"
      > */}
        <OrderPropertiesForm />
        <MessageForm />   
      {/* </div> */}
      </Form>
      
    </Container>
  )
};

export default Dashboard