import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes';
import './styles/tailwind.css';

const pending = sessionStorage.getItem('redirect');
if (pending) {
  sessionStorage.removeItem('redirect');
  if (pending !== location.pathname + location.search + location.hash) {
    history.replaceState(null, '', pending);
  }
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
