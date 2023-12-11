import React, { useContext } from "react";
import { authRoutes, publicRoutes } from "../routes";
import Test from '../pages/test'
import {  Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { AUTH_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import Auth from "../pages/Auth";
import { Context } from "../index";
import NavBar from "./Navbar";

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log(user)
  user.setAuth(true)

  return (
    <>
      {user.isAuth && <NavBar />}

      <Routes>
        {user.isAuth && authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}

        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}

        <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    </>
  );
};

export default AppRouter