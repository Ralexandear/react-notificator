import React from 'react'
import { Container } from 'react-bootstrap'
import RightSidebarMenu from './RightSidebarMenu'

const OrderPropertiesForm = () => {
  return (
    <Container
      className='order_form'
    >
      <div className="item form-floating mb-3">
        <input className="form-control" list="clientNameList" id="clientNameInput" placeholder=""/>
        <label for="clientNameInput">Название клиента</label>
      </div>
      <div className="item form-floating mb-3">
          <textarea className="form-control" placeholder="Leave a comment here" id="addressInput" style={{resize: "none"}}></textarea>
          <label for="addressInput">Адрес</label>
        </div>
        <div className="item d-flex">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Заказано</span>
            <input type="text" className="form-control" placeholder="" pattern="\d{1,2},\d"/>
          </div>
        </div>
        <div className="item d-flex">
          <div className="input-group mb-3">
            <span className="input-group-text">В лабу</span>
            <input type="text" className="form-control" placeholder="" pattern="\d{1,2},\d"/>
          </div>
        </div>
        <div className="item d-flex">
          <h3 className='me-3 mb-0'>Курьер</h3>
          <div className="input-group">
            <span className="input-group-text" style={{width: "auto"}}>К</span>
            <input type="text" className="form-control" placeholder="" pattern="\d{1,2},\d"/>
          </div>
        </div>
        
      
    </Container>
  )
}

export default OrderPropertiesForm