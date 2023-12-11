import React, { useContext } from 'react'
import '../styles/_main.sass'
import { Container, Form, InputGroup, Button } from 'react-bootstrap'
import { Context } from '../index.tsx';
import { Navigate } from 'react-router-dom';

import UserStore from '../store/UserStore.ts';

const Auth = () => {
  //@ts-expect-error
  const { user } : { user: UserStore | null } = useContext(Context);
  

  if (user && user.isAuth) { // Если пользователь авторизован, перенаправляем на другую страницу
    return <Navigate to="/dashboard" />;
  }

  return (
    <div
      className='d-flex justify-content-center p-sm-3'
      style={{
        background: '#c7c7c7',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Container
        style={{
          padding: '15px',
          borderRadius: '10px',
          background: 'white',
          maxWidth: '400px',
          // height: '100%'
        }}
      >
      <div
        className="d-flex flex-column align-items-center justify-content-between"
        style={{height: '100%'}}
      >
        <div
          className='d-flex flex-column align-items-center'
          // style={{minHeight: '530px'}}
        >
          <img
            className='mt-md-5 mb-md-5 mt-sm-3 mb-sm-3 mt-1 mb-1'
            style={{
              height: '25vh',
              width: '35vw',
              minHeight: '100px',
              maxHeight: '250px',
              minWidth: '100px'
            }}
            src="/icons/notificatorLoginLogo.svg" alt="logo"
          />
          <h3 className='mb-md-4 mb-3'>Авторизация</h3> 
          <div>
            <InputGroup className='mb-3' style={{width: '100%'}}>
              <InputGroup.Text id="login">Логин</InputGroup.Text>
              <Form.Control
                size='lg'
                // placeholder='username'
                aria-label='username'
                aria-describedby='login'
                />
            </InputGroup>
            <InputGroup className='mb-sm-4 mb-3'>
              <InputGroup.Text id="password">Пароль</InputGroup.Text>
              <Form.Control
                size='lg'
                type='password'
                aria-describedby='password'
              />
            </InputGroup>
            <Button
              variant='green'
              className='mb-3 w-100'
              size='lg'
              style={{borderRadius: '30px'}}
            >
            Войти
            </Button>
          </div>
        </div>
        <div>
          <p style={{ textAlign: "center" }}>Developed by Ralexandear</p>
        </div>
      </div>          
      </Container>
    </div>
  )
}

export default Auth