import React from "react";
import { Container, Form } from "react-bootstrap";
import MessageForm from "../components/MessageForm";
import OrderPropertiesForm from "../components/OrderPropertiesForm";

const Dashboard = () => {
  return (
    <Container>
      <Form
        className="d-flex"
      >
        {/* <OrderPropertiesForm />
        <MessageForm />   */}
      </Form>
      
    </Container>
  )
};

export default Dashboard