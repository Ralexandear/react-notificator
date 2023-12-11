import { Button, Nav, Navbar } from 'react-bootstrap';

const OrderTabs = ({ id }) => {
  return (
    <div class="container d-flex" id="nav__container">
      <div class="nav container nav-pills" id="nav-tab" role="tablist">
        <button class="nav-link" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">🧪 Лабомат</button>
        <button class="nav-link"  data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">🦠 Антиген</button>
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">👩‍🔬 Cito</button>
        <button class="nav-link active" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">🛴 Самокат</button>
      </div>  
    </div>
  //   <Navbar id={ id } >
  //     <Nav variant="pills" activeKey="1">
  //       <Nav.Item>
  //           <Button
  //             key="1"
  //             className="me-2 active"
  //             // role="tab"
  //             // data-bs-toggle="tab"
  //             // type="button"
  //             variant="outline-green"
  //           >🧪 ДЦ / КК</Button>

  //       </Nav.Item>
  //       <Nav.Item >

  //           <Button
  //             // className="me-2"
  //             // role="tab"
  //             // data-bs-toggle="tab"
  //             // type="button"
  //             variant="outline-green"
  //           >🛴 Самокат</Button>
  //       </Nav.Item>
  //     </Nav>
  // </Navbar>
  )
};

export default OrderTabs

// function PillsExample() {
//   return (
//     <Nav variant="pills" >
//       <Nav.Item>
//         <Nav.Link>Active</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link eventKey="link-1">Option 2</Nav.Link>
//       </Nav.Item>
//     </Nav>
//   );
// }

// export default PillsExample;

