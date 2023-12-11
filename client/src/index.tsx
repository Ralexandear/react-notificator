import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/global.sass';

import UserStore from './store/UserStore.ts';
import OrderStore from './store/OrderStore.ts';

interface ContextProps {
  user: UserStore;
  order: OrderStore;
}

export const Context = createContext<ContextProps | null>(null);

const rootElement = document.getElementById('root') ?? document.body;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    order: new OrderStore()
  }}>
    <App />  
  </Context.Provider>
);
