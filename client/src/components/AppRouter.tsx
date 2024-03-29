import React, { useContext } from "react";
import { authRoutes, publicRoutes } from "../routes.ts";
import {  Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'

import { AUTH_ROUTE, LOGIN_ROUTE } from "../utils/consts.ts";
import Auth from "../pages/Auth.tsx";
import { Context } from "../index.tsx";
import NavBar from "./Navbar.tsx";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user, order } = useContext(Context);
  console.log(user)
  console.log(order)

  // user.setAuth(true)

  return (
    <>
      {user.isAuth && <NavBar />}

      <Routes>
        {user.isAuth && authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />}  />
        ))}

        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />}  />
        ))}

        <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    </>
  );
});

export default AppRouter