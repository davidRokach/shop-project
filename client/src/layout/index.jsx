import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      {/*
        Outlet render element by path in url 
        Emaple: /home => will be render The elment of Home components
        */}
      <div className="outlet-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
