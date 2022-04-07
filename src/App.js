import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginScreen from "./screens/Login";
import NotFound from "./screens/NotFound";
import CsrLandingScreen from "./screens/CSRLanding";
import CustomerLandingScreen from "./screens/CustomerLanding";
import { RequireAuth } from "./components/auth";
import CsrViewChatScreen from "./screens/CSRViewChat";
import SnackBar from "./components/snackBar";
import CommonHeader from "./components/header";
import CustomerViewChatScreen from "./screens/CustomerViewChat";
import { InitializingAPICSR } from "./screens/CSRViewChat/CSRChatAPI";
import { store } from "./redux/store";
import {Provider} from 'react-redux';

function App() {
  const location = window.location.pathname;
  useEffect(()=>{
    if(location === "/csr"){
      InitializingAPICSR();
    }
  },[location])
  return (
    <Provider store= {store}>
      <CommonHeader />
      <div className="bodyContent">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route
              path="/customer"
              element={
                <RequireAuth redirectTo="/">
                  <CustomerLandingScreen />
                </RequireAuth>
              }
            />
            <Route
              path="/customer/chat"
              element={
                <RequireAuth redirectTo="/">
                  <CustomerViewChatScreen/>
                </RequireAuth>
              }
            />
            <Route
              path="/csr"
              element={
                <RequireAuth redirectTo="/">
                  <CsrLandingScreen />
                </RequireAuth>
              }
            />
            <Route
              path="/csr/chat"
              element={
                <RequireAuth redirectTo="/">
                  <CsrViewChatScreen />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <SnackBar />
    </Provider>
  );
}

export default App;
