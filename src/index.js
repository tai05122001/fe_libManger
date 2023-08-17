import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetPwdScreen from './screens/ResetPwdScreen';
import ChangeEmailScreen from './screens/ChangeEmailScreen';
import reportWebVitals from './reportWebVitals';
import { GlobalProvider } from './global';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/register" element={<RegisterScreen />}></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/resetpwd" element={<ResetPwdScreen />}></Route>
          <Route path="/changeEmail" element={<ChangeEmailScreen />}></Route>
        </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
