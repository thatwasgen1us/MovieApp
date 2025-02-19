import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import router from "./router";
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store/store';

// setup axios
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

if (!accessToken) {
  console.error("Access token is not defined");
} else {
  axios.defaults.baseURL = "https://api.themoviedb.org/3";
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
