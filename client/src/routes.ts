import { AUTH_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE } from "./utils/consts.ts"

import Auth from './pages/Auth.tsx'
import OrderForm from "./pages/Dashboard.tsx"
import Settings from "./pages/Settings.tsx"
import Dashboard from "./pages/Dashboard.tsx"

export const authRoutes = [
  {
    path: DASHBOARD_ROUTE,
    Component: Dashboard
  },
  {
    path: SETTINGS_ROUTE,
    Component: Settings
  }
]

export const publicRoutes = [ 
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: AUTH_ROUTE,
    Component: Auth
  },
]