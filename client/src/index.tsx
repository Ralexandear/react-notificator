import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './styles/global.sass';
import UserStore from './store/UserStore.ts';
import OrderStore from './store/OrderStore.ts';

export interface ContextProps {
  user: UserStore;
  order: OrderStore;
}

export const Context = createContext<ContextProps>({
  user: new UserStore(),
  order: new OrderStore()
});

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <Context.Provider value={{
    user: new UserStore(),
    order: new OrderStore()
  }}>
    <App />  
  </Context.Provider>
);
