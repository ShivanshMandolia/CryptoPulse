import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Layout from './Layout';  // Layout with fixed navbar
import Homepage from './components/Homepage';  // Homepage component
import Exchanges from './components/Exchanges';  // Exchanges component
import Cryptocurrencies from './components/Cryptocurrencies';  // Cryptocurrencies component
import CryptoDetails from './components/CryptoDetails';  // CryptoDetails component
import News from './components/News';  // News component
import { Provider } from 'react-redux'
import store from './store/store';

import './index.css';
// Create router with nested routes
const router = createBrowserRouter([
  {
    path: '/',  // Root path
    element: <Layout />,  // Layout wraps around the content
    children: [
      {
        path: '',  // Homepage
        element: <Homepage />,
      },
      {
        path: 'exchanges',  // Exchanges page
        element: <Exchanges />,
      },
      {
        path: 'cryptocurrencies',  // Cryptocurrencies page
        element: <Cryptocurrencies />,
      },
      {
        path: 'crypto/:coinId',  // Crypto details page with dynamic coinId
        element: <CryptoDetails />,
      },
      {
        path: 'news',  // News page
        element: <News />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>
);
